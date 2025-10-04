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
import { ref, defineProps, provide, computed, inject, onMounted } from 'vue'
import { formItemProps, FormItemValidateState, formItemContextKey, FormItemContext, FormItemRule, Arrayable } from './form-item'
import { FormContextKey, FormContext } from './form'
import AsyncValidator, { Values, ValidateError } from 'async-validator'

const FormContext = inject(FormContextKey)
console.log('[form-item] FormContext:', FormContext)

const bem = createNamespace('form-item')

const props = defineProps(formItemProps)
console.log('[form-item] props:', props)

// 增加组件名字
defineOptions({
  name: 'z-form-item'
})

const validateState = ref<FormItemValidateState>('') // success s
const validateMessage = ref('')

const converArray = (
  rules: Arrayable<FormItemRule> | undefined
): FormItemRule[] => {
  return rules ? (Array.isArray(rules) ? rules : [rules]) : []
}

const _rules = computed(() => {
  const myRules: FormItemRule[] = converArray(props.rules) // 自己的规则
  const formRules = FormContext?.rules
  if (formRules && props.prop) {
    const _temp = formRules[props.prop]
    if (_temp) {
      myRules.push(...converArray(_temp))
    }
  }
  console.log('[form-item] _rules:', myRules)
  return myRules
})

const getRuleFiltered = (trigger: string) => {
  const rules = _rules.value
  const filtered = rules.filter(rule => {
    if (!rule.trigger || !trigger) return true
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger)
    } else {
      return rule.trigger === trigger
    }
  })
  console.log('[form-item] getRuleFiltered:', { trigger, filtered })
  return filtered
}

const onValidationSucceeded = () => {
  validateState.value = 'success'
  validateMessage.value = ''
}

const onValidationFailed = (error: any) => {
  console.log('[form-item] Validation failed:', error)
  validateState.value = 'error'

  // 正确处理 async-validator 的错误对象结构
  if (error && error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
    // async-validator 返回的错误对象包含 errors 数组
    validateMessage.value = error.errors[0].message || 'Validation failed'
  } else if (error && Array.isArray(error) && error.length > 0) {
    // 直接传入错误数组的情况
    validateMessage.value = error[0].message || 'Validation failed'
  } else {
    // 其他情况，设置默认错误消息
    validateMessage.value = 'Validation failed'
  }
}

const validate: FormItemContext['validate'] = async (trigger, callback?) => {
  // 拿到触发时机，校验是否可以通过调用 callback 或者调用 promise.then 方法
  const rules = getRuleFiltered(trigger)

  // rules 就是触发的规则，trigger就是触发的方式
  // 需要找到对应的数据源头 上面找到对应的 prop

  // 触发事件了，找到对应的规则，和数据源在哪里，校验那个属性
  const modelName = props.prop!
  // 拿到校验器
  const validator = new AsyncValidator({
    [modelName]: rules
  })

  const model = FormContext?.model!

  return validator
    .validate({
      [modelName]: model[modelName]
    })
    .then(() => {
      onValidationSucceeded()
      if (callback) callback(true)
      return true
    })
    .catch((err: any) => {
      onValidationFailed(err)
      if (callback) callback(false)
      return Promise.reject(err)
    })
}

const formItemContext: FormItemContext = {
  ...props,
  validate
}

provide(formItemContextKey, formItemContext)

onMounted(() => {
  FormContext?.addField(formItemContext)
})
</script>