import { App, Plugin, Component } from 'vue'

// 约束 T 必须是 Vue 的 Component 类型
export type SFCWithInstall<T> = T & Plugin

// 泛型 T 加上 extends Component 约束，解决了类型分配错误
export function withInstall<T extends Component>(comp: T) {
  (comp as SFCWithInstall<T>).install = function (app: App) {
    // 确保组件有 name 属性，否则 app.component(undefined, comp) 会失败
    const { name } = comp as unknown as { name: string }
    
    // 如果没有 name 属性，这里可能需要一个回退或错误处理
    if (name) {
      app.component(name, comp)
    }
  }
  return comp as SFCWithInstall<T>
}