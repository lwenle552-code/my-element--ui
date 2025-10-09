<script setup lang="ts">
import { ref, reactive } from 'vue' // <-- 1. 引入 ref
import { AddCircle } from '@vicons/ionicons5'

import type { FormInstance } from '@zi-shui/components/form'
import type { UploadRawFile } from '@zi-shui/components/upload'
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

const username = ref('hello')
const handleFocus = (e: FocusEvent) => {
  console.log((e.target as HTMLInputElement).value, 'focus')
}

const handleBlur = (e: FocusEvent) => {
  console.log((e.target as HTMLInputElement).value, 'blur')
}

const state = reactive({
  username: '',
  password: '',
})
const formRef = ref<FormInstance>()
const validateForm = () => {
  const form = formRef.value
  form?.validate((valid, errors) => {
    console.log(valid, errors)
  })
}

const handleBeforeUpload = (rawFile: UploadRawFile) => {
  // 添加一些处理逻辑
  console.log('准备上传文件:', rawFile)
  return true // 返回 true 允许上传，返回 false 阻止上传
}

const handleUploadSuccess = (response: any, file: UploadRawFile) => {
  console.log('上传成功:', response, file)
}

const handleUploadError = (error: any, file: UploadRawFile) => {
  console.log('上传失败:', error, file)
}

const handleUploadProgress = (event: any, file: UploadRawFile) => {
  console.log('上传进度:', event, file)
}

const currentDate = ref(new Date())
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

  <z-input v-model="username" @blur="handleBlur" @focus="handleFocus" placeholder="请输入密码" :show-password="true"
    :clearable="true">
    <template #prepend>前端</template>
    <template #prefixIcon>
      <z-icon>
        <AddCircle></AddCircle>
      </z-icon>
    </template>
    <template #sufixIcon>
      <!-- <z-icon>
        <AddCircle></AddCircle>
      </z-icon> -->
    </template>
    <template #append>后端</template>
  </z-input>

  <z-form ref="formRef" :model="state" :rules="{
    username: { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: ['blur', 'change'] }
  }
    ">
    <z-form-item prop="username" label="用户名" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' },

    ]">
      <z-input placeholder="请输入用户名" :clearable="true" v-model="state.username">
      </z-input>
    </z-form-item>

    <z-form-item prop="password" label="密码" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },

    ]">
      <z-input placeholder="请输入密码" :clearable="true" v-model="state.password" :show-password="true">
      </z-input>
    </z-form-item>
    <z-button a="1" b="2" size="medium" type="primary" :round="true" @click="validateForm">
      提交
    </z-button>
  </z-form>

  <!-- 使用本地服务器地址 -->
  <z-upload action="http://localhost:3000/upload" :multiple="true" :before-upload="handleBeforeUpload"
    :on-success="handleUploadSuccess" :on-error="handleUploadError" :on-progress="handleUploadProgress" drag>
    <z-button>点我上传</z-button>
  </z-upload>

  {{ currentDate }}
  <z-calendar v-model="currentDate">
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '√' : '' }}
      </p>
    </template>
  </z-calendar>
</template>

<style scoped></style>