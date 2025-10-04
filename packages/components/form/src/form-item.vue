<template>
  <div :class="[bem.b(),
  bem.is('success', validateState == 'success'),
  bem.is('error', validateState == 'error')
  ]">
    <label :class="bem.e('label')" v-if="label">{{ label }}</label>
    <div :class="bem.e('content')">
      <slot></slot>
      <div :class="bem.e('error')" v-if="validateMessage">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from '@zi-shui/utils/create'
import { ref, defineProps, provide, computed } from 'vue'
import { formItemProps, FormItemValidateState, formItemContextKey, FormItemContext, FormItemRule } from './form-item'

const bem = createNamespace('form-item')

const props = defineProps(formItemProps)

// 增加组件名字
defineOptions({
  name: 'z-form-item'
})

// 这里主要是检验逻辑
const validateState = ref<FormItemValidateState>('') // success s
const validateMessage = ref('')

const _rules = computed(() => {
  const rules: FormItemRule[] = props.rules
    ? Array.isArray(props.rules)
      ? props.rules
      : [props.rules]
    : []

  return rules
})

const getRuleFiltered = (trigger: string) => {
  // blur change
  const rules = _rules.value

  return rules.filter(rule => {
    if (!rule.trigger || !trigger) return true // 这种情况意味着无论如何都要校验
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger)
    } else {
      return rule.trigger === trigger
    }
  })
}

const validate: FormItemContext['validate'] = async (trigger, callback?) => {
  // 拿到触发时机，校验是否可以通过调用 callback 或者调用 promise.then 方法
  const rules = getRuleFiltered(trigger)
  console.log('trigger', trigger, rules)
}
// 提供上下文给子组件
const formItemContext: FormItemContext = {
  ...props,
  validate: async (trigger: string, callback?: (isValid: boolean) => void) => {
    // 这里应该实现实际的验证逻辑
    console.log('validate', trigger)
    // 模拟验证结果
    const isValid = true
    callback?.(isValid)
    return Promise.resolve()
  }
}

provide(formItemContextKey, formItemContext)
</script>