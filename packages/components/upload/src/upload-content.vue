<template>
  <div @click="handleClick" :class="[bem.b()]">
    <template v-if="drag">
      <uploadDragger @file="uploadFiles">
        <slot></slot>
      </uploadDragger>
    </template>
    <template v-else>
      <slot></slot>
    </template>

    <input ref="inputRef" type="file" :name="name" :accept="accept" :multiple="multiple" @change="handleChange" />
  </div>
</template>

<script setup lang="ts">
import { createNamespace } from '@zi-shui/utils/create'
import { UploadRawFile } from './upload'
import { httpRequest } from './ajax'
import { ref } from 'vue'
import { uploadContentProps } from './upload-content'
import uploadDragger from './upload-dragger.vue'
const bem = createNamespace('upload')
defineOptions({ name: 'z-upload', inheritAttrs: false })

const props = defineProps(uploadContentProps)

function genId(): string {
  return Date.now() + Math.random().toString(16).slice(2)
}

async function upload(rawfile: UploadRawFile) {
  if (inputRef.value) inputRef.value.value = ''
  let result = await props.beforeUpload(rawfile)
  if (result === false) return props.onRemove(rawfile)

  // 上传文件 ajax 来做处理
  const { method, name, action, headers, data } = props

  httpRequest({
    method,
    name,
    file: rawfile, // 使用 rawfile 变量
    action,
    headers,
    data,
    onError: e => {
      props.onError(e, rawfile); // 调用父组件传入的 onError
    },
    onSuccess: (res) => {
      props.onSuccess(res, rawfile); // 调用父组件传入的 onSuccess
    },
    onProgress: (e) => {
      props.onProgress(e, rawfile); // 调用父组件传入的 onProgress
    }
  })

}

function uploadFiles(files: FileList) {
  for (let i = 0; i < files.length; i++) {
    const rawFile = files[i] as UploadRawFile
    rawFile.uid = genId()
    props.onStart(rawFile)
    upload(rawFile)
  }
}

const handleChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files!
  uploadFiles(files)
}

const inputRef = ref<HTMLInputElement>()
const handleClick = () => {
  if (inputRef.value) inputRef.value.value = ''
  inputRef.value?.click()
}
</script>