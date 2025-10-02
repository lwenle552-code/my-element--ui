<template>
  <button :class="[
    bem.b(),
    bem.m(type),
    bem.m(size),
    bem.is('round', round),
    bem.is('loading', loading),
    bem.is('disabled', disabled),
  ]" :type="nativeType" :disabled="disabled || loading" @click="handleClick">
    <template v-if="loading">
      <span :class="bem.e('loading-dots')">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </span>
    </template>

    <template v-else-if="$slots.icon">
      <z-icon>
        <slot name="icon"></slot>
      </z-icon>
    </template>

    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { createNamespace } from '@zi-shui/utils/create';
import { buttonEmits, buttonProps } from './button'; // 确保导入正确

const bem = createNamespace('button')

defineOptions({
  name: 'z-button'
})
const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

// 5. 新增 click 事件处理函数，在组件内部检查 disabled 和 loading 状态
const handleClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', e)
}
</script>