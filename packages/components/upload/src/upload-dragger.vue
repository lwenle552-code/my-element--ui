<template>
  <div @dragover.prevent="onDragover" @dragleave.prevent="isOver = false" @drop.prevent="onDrop">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isOver = ref(false)
const emit = defineEmits()

const onDrop = (e: DragEvent) => {
  e.stopPropagation();
  // 触发 'file' 事件，并传递拖放的文件列表
  emit('file', Array.from(e.dataTransfer!.files))
}

const onDragover = function () {
  isOver.value = true;
}
</script>