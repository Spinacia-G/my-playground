<script setup lang="ts">
import BaseMap from '@/views/map-3d/components/BaseMap.vue'
import MapTools from '@/views/map-3d/components/MapTools.vue'
import { shallowRef, provide } from 'vue'
import * as Cesium from 'cesium'
import { cesiumViewerKey } from '@/utils/symbol.ts'

window.CESIUM_BASE_URL = '/Cesium/'

const viewer = shallowRef<Cesium.Viewer>()
provide(cesiumViewerKey, viewer)
</script>

<template>
  <div class="absolute h-screen w-screen inset-0 z-1">
    <base-map />
  </div>
  <map-tools v-if="viewer" class="absolute left-4 top-4 z-10" />
</template>
