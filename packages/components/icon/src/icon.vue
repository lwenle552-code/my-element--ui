<template>
  <i :class="bem.b()" :style="style">
    <slot />
  </i>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { createNamespace } from '@zi-shui/utils/create'
import { iconProps } from './icon';

const bem = createNamespace('icon')
defineOptions({
  name: 'z-icon'
})

const props = defineProps(iconProps)
//计算属性来计算一个样式
const style = computed(() => {
  if (!props.size && !props.color) return {}
  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { 'color': props.color } : {})
  }
})
</script>
