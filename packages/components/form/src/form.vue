<template>
  <form :class="bem.b()">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { createNamespace } from '@zi-shui/utils/create';
import { formProps, FormContextKey, FormContext } from './form';
import { FormItemContext } from './form-item';
import { provide, defineExpose } from 'vue';
import type { Values } from 'async-validator';

const bem = createNamespace('form')
defineOptions({
  name: 'z-form',
})

const props = defineProps(formProps)

const fields: FormItemContext[] = [] // 父亲收集儿子
// form的校验，在父级中调用所有儿子的校验方法
const validate = async (
  callback?: (valid: boolean, fields?: Values) => void
) => {
  let errors: Values = {}

  // 1. 遍历并执行所有 FormItem 的校验
  for (const field of fields) {
    try {
      // 对每个 FormItem 调用其 validate 方法
      // 传入空字符串作为 trigger，通常表示执行所有规则
      await field.validate('')
    } catch (error) {
      // 如果校验失败，捕获错误
      errors = {
        ...errors,
        ...(error as Values) // 合并字段错误
      }
    }
  }

  // 2. 处理校验结果

  // // 没有错误就成功
  if (Object.keys(errors).length === 0) {
    // 如果提供了 callback，则调用 callback(true)
    callback?.(true)
    return true
  } else {
    // // 有错误就失败
    if (callback) {
      // 如果提供了 callback，则调用 callback(false, errors)
      callback?.(false, errors)
      return false
    } else {
      // 如果没有提供 callback，则返回一个被拒绝的 Promise
      return Promise.reject(errors)
    }
  }
}

const addField: FormContext['addField'] = context => {
  fields.push(context)
}

const context = {
  ...props,
  addField
}
provide(FormContextKey, context)

// 暴露 validate 方法给父组件使用
defineExpose({
  validate
})
</script>