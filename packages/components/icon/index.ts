//用来整合组件，最终实现导出


import _Icon from './src/icon.vue'
import { withInstall  } from '@zi-shui/utils/with-install'

const Icon = withInstall(_Icon)

export default Icon//可以通过app.use()来使用 也可以通过import来使用

export * from './src/icon'

//这里加的类型，可以被解析
declare module 'vue' {
  export interface GlobalComponents {
    ZIcon: typeof Icon
  }
}