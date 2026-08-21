/** 声明 `*.css?inline` 虚拟模块（tsdown 的 dsh-css-inline loader 返回编译文本）。 */
declare module '*.css?inline' {
  const css: string
  export default css
}
