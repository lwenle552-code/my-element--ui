//form-item

//form由formItem组成
//prop 校验输入框的属性
//label 输入框的标题
//rules 校验规则
//show-message 显示错误信息

//change blur 事件
import type { RuleItem } from 'async-validator'
import { PropType, ExtractPropTypes, InjectionKey } from 'vue'

export type Arrayable<T> = T | T[]

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string> | string[]
}

export const formItemValidateState = ['success', 'error', ''] as const
export type FormItemValidateState = (typeof formItemValidateState)[number]

export const formItemProps = {
  prop: String,
  label: String,
  rules: [Object, Array] as PropType<Arrayable<FormItemRule>>,
  showMessage: {
    type: Boolean,
    default: true
  }
} as const

export type FormItemProps = Partial<ExtractPropTypes<typeof formItemProps>>

// 添加类型别名，方便导出
export type FormItem = FormItemProps

export interface FormItemContext extends FormItemProps {
  validate: (
    trigger: string,
    callback?: (isValid: boolean) => void
  ) => Promise<any>
}

export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey')
