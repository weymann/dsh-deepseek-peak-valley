/**
 * dsh-deepseek-peak-valley 构建配置（自包含，等价于官方 clientBundle preset）。
 *
 * 产物契约（与官方 packages/client/ui-message-feedback 等 client 包一致）：
 * - lib/index.js    —— node 半（host stub，空 apply()），让插件出现在 host Loader 中
 * - lib/client.js   —— browser 半，包装为 window.__ModuleLoader__.load({ id, factory })
 *                      外部模块通过注入的 require 从模块表解析（react / cordis /
 *                      @deepseek-ai/dsh-client-ui-slots / dsh-client-runtime/client）
 * - 所有其它 @deepseek-ai/* 值导入在构建期被 purity 门拒绝（类型导入会被擦除）
 * - `*.css?inline` 虚拟模块导出编译后的 CSS 文本，由插件在 apply 中用
 *   ctx.effect 注入/清理样式（003 生命周期契约：dispose 清理样式注入）
 */
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, isAbsolute, resolve } from 'node:path'
import { transform } from 'lightningcss'
import type { UserConfig } from 'tsdown'

const ID = 'dsh-deepseek-peak-valley'

/** 官方模块表：shell 共享的冻结平台模块（与 packages/client/web/src/platform.ts 对齐）。 */
const PLATFORM_MODULES = [
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
  '@deepseek-ai/cordis',
  '@deepseek-ai/dsh-client-ui-slots',
] as const

/** 官方预取外部：browser runtime 模块表行（官方明确豁免的临时行）。 */
const PRELOADED_CLIENT_EXTERNALS = [
  '@deepseek-ai/dsh-client-runtime/client',
] as const

/** 请求从模块表解析（保持 import、不内联）的说明符。 */
function isRequested(specifier: string): boolean {
  return (PLATFORM_MODULES as readonly string[]).includes(specifier)
    || (PRELOADED_CLIENT_EXTERNALS as readonly string[]).includes(specifier)
}

const INLINE_CSS_QUERY = '?inline'
const CSS_VIRTUAL_PREFIX = '\0dsh-inline-css:'
const CSS_VIRTUAL_SUFFIX = '.mjs'

/** 把相对 import 解析到物理样式表（tsdown 消费 src/ 源文件，无需 lib 回退）。 */
function sourceAssetPath(source: string, importer: string): string {
  const abs = resolve(dirname(importer), source)
  if (existsSync(abs)) return abs
  return source
}

/** Node 半：host stub。无外部依赖，全部内联。 */
function nodeConfig(): UserConfig {
  return {
    name: ID,
    entry: ['src/index.ts'],
    outDir: 'lib',
    format: ['esm'],
    platform: 'node',
    target: 'es2022',
    fixedExtension: false,
    dts: false,
    clean: false,
    deps: {
      alwaysBundle: () => true,
    },
  }
}

/** Browser 半：client bundle，包装为 __ModuleLoader__.load。 */
function clientConfig(): UserConfig {
  return {
    name: `${ID}/client`,
    entry: { client: 'src/client/index.ts' },
    // 与 node 半共用 lib/（entryFileNames 钉住 lib/client.js；clean 必须关闭，
    // 否则会清掉上面 node 半的输出）。
    outDir: 'lib',
    format: 'cjs',
    platform: 'browser',
    target: 'es2022',
    sourcemap: true,
    dts: false,
    clean: false,
    deps: {
      neverBundle: isRequested,
      alwaysBundle: (specifier: string) => !isRequested(specifier),
    },
    plugins: [
      {
        // 构建期 purity 门（模块边界的镜像）：@deepseek-ai/* 值导入只允许
        // 模块表行；跨插件值导入是构建错误（协作走 cordis service / slot）。
        name: 'dsh-deepseek-peak-valley-client-purity',
        resolveId(source: string) {
          if (!source.startsWith('@deepseek-ai/')) return null
          if (isRequested(source)) return null
          throw new Error(
            `client bundle purity: "${source}" is not a platform module or an explicit `
            + 'dsh.client.external request — cross-plugin value imports are forbidden '
            + '(type-only imports are erased and never reach this gate)',
          )
        },
      },
      {
        // `*.css?inline` -> 导出编译文本；由插件 ctx.effect 注入/清理。
        name: 'dsh-deepseek-peak-valley-css-inline',
        resolveId(source: string, importer: string | undefined) {
          if (!source.endsWith(`.css${INLINE_CSS_QUERY}`)) return null
          const stylesheet = source.slice(0, -INLINE_CSS_QUERY.length)
          const abs = importer !== undefined ? sourceAssetPath(stylesheet, importer) : stylesheet
          return CSS_VIRTUAL_PREFIX + abs + CSS_VIRTUAL_SUFFIX
        },
        async load(virtualId: string) {
          if (!virtualId.startsWith(CSS_VIRTUAL_PREFIX)) return null
          const fileId = virtualId.slice(CSS_VIRTUAL_PREFIX.length, -CSS_VIRTUAL_SUFFIX.length)
          this.addWatchFile(fileId)
          const source = await readFile(fileId)
          const { code } = transform({ filename: fileId, code: source, minify: true })
          return `export default ${JSON.stringify(code.toString())};`
        },
      },
    ],
    outputOptions: {
      entryFileNames: 'client.js',
      banner: `window.__ModuleLoader__.load({ id: ${JSON.stringify(ID)}, factory: (require) => {`,
      footer: 'return module.exports; } });',
      intro: 'var module = { exports: {} }; var exports = module.exports;',
    },
  }
}

export default [nodeConfig(), clientConfig()]
