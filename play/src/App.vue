<script setup lang="ts">
import { ref } from 'vue' // <-- 1. 引入 ref
import { AddCircle } from '@vicons/ionicons5'

// 2. 新增 loading 状态
const isLoading = ref(false)

// 3. 定义点击处理函数
const handleButtonClick = () => {
  if (isLoading.value) return // 避免重复点击

  isLoading.value = true

  // 模拟异步操作，2秒后结束 loading
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

<template>
  <z-icon :color="'red'" :size="30">
    <AddCircle></AddCircle>
  </z-icon>
  <z-icon :color="'yellow'" :size="30">
    <AddCircle></AddCircle>
  </z-icon>

  <z-button size="medium" type="danger" :round="true" :loading="isLoading" @click="handleButtonClick">
    {{ isLoading ? '加载中' : '按钮' }}

    <template #icon>
      <z-icon>
        <AddCircle></AddCircle>
      </z-icon>
    </template>
  </z-button>
</template>

<style scoped></style>