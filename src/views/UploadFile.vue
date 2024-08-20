<!-- 自定义文件上传组件 -->
<script setup lang="ts">
import { ref } from 'vue'

const inputRef = ref<HTMLInputElement>()
const handleClick = () => {
  inputRef.value?.click()
}
const handleChange = (e: Event) => {
  console.log((e.target as HTMLInputElement).files)
}
</script>

<template>
  <div class="absolute z-10 bg-[#f0f0f3] top-[50px] p-10 w-screen">
    <div @click="handleClick">
      <button class="px-4 py-2 bg-[#fff] rounded">Upload File</button>
      <input ref="inputRef" class="hidden" type="file" multiple @click.stop @change="handleChange" />
    </div>
  </div>
</template>
