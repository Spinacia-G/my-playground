<script setup lang="ts">
import BaseMap from '@/views/map-3d/components/BaseMap.vue'

window.CESIUM_BASE_URL = '/Cesium/'
</script>

<template>
  <div class="absolute h-screen w-screen inset-0">
    <base-map />
  </div>
</template>

<style scoped lang="scss"></style>
