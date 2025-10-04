// 整合表单组件，表单组件的入口
import { withInstall } from '@zi-shui/utils/with-install'
import _FormItem from './src/form-item.vue'

const FormItem = withInstall(_FormItem)

export default FormItem

export type { FormItem } from './src/form-item'

declare module 'vue' {
  export interface GlobalComponents {
    ZFormItem: typeof FormItem
    'z-form-item': typeof FormItem
  }
}
