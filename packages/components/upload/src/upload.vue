<template>
  <UploadContent v-bind="contentProps">
    <slot></slot>
  </UploadContent>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { uploadProps } from './upload';
import UploadContent from './upload-content.vue'
import type { UploadRawFile, UploadProgressEvent } from './upload';

// 定义 UploadFile 接口
interface UploadFile {
  uid: string
  name: string
  percentage: number
  raw: UploadRawFile
  size: number
  status: 'start' | 'uploading' | 'success' | 'error'
}

defineOptions({ name: 'z-upload' })
const props = defineProps(uploadProps)
const emit = defineEmits(['onUpload:file-list'])

// 初始化为空数组
const uploadFiles = ref<UploadFile[]>([])

watch(uploadFiles, (newVal) => {
  emit('onUpload:file-list', newVal)
})

const findFile = (rawFile: UploadRawFile) => {
  return uploadFiles.value.find(file => file.uid === rawFile.uid)
}

const contentProps = computed(() => ({
  ...props,
  onStart: (rawFile: UploadRawFile) => {
    // 上传之前的逻辑
    const uploadFile: UploadFile = {
      uid: rawFile.uid,
      name: rawFile.name,
      percentage: 0,
      raw: rawFile,
      size: rawFile.size,
      status: 'start'
    }

    uploadFiles.value = [...uploadFiles.value, uploadFile];
    // 使用已定义的 props 事件
    props.onStart(rawFile)
  },
  onProgress: (e: UploadProgressEvent, rawFile: UploadRawFile) => {
    const uploadFile = findFile(rawFile)!
    uploadFile.status = 'uploading'
    uploadFile.percentage = e.percentage; // 更新进度
    props.onProgress(e, rawFile); // 调用父组件传递的回调
  },
  onRemove: (rawFile: UploadRawFile) => {
    const uploadFile = findFile(rawFile);
    if (!uploadFile) return;

    // 执行移除操作
    const fileList = uploadFiles.value
    // 从文件列表中移除文件
    fileList.splice(fileList.indexOf(uploadFile), 1)

    // 触发外部的 onRemove 事件
    props.onRemove(rawFile)
  },

  onError: (err: any, rawFile: UploadRawFile) => {
    const uploadFile = findFile(rawFile);
    if (!uploadFile) return;

    // 设置文件状态为 'error'
    uploadFile.status = 'error'

    // 触发外部的 onError 事件
    props.onError(err, rawFile)
  },

  onSuccess: (res: any, rawFile: UploadRawFile) => {
    const uploadFile = findFile(rawFile);
    if (!uploadFile) return;

    // 设置文件状态为 'success'
    uploadFile.status = 'success'

    // 触发外部的 onSuccess 事件
    props.onSuccess(res, rawFile)
  }
}))
</script>