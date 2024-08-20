<script setup lang="ts">
import { DrawTool } from '@/utils/cesiumControl/draw-tool.ts'
import { inject } from 'vue'
import { cesiumViewerKey } from '@/utils/symbol.ts'
import * as Cesium from 'cesium'

const viewer = inject(cesiumViewerKey)!

let drawTool = new DrawTool(viewer.value)
drawTool.drawEvt.addEventListener((posArr: Cesium.Cartesian3[]) => {
  console.log(posArr)
})
const handleDraw = () => {
  drawTool.activate()
}
</script>

<template>
  <div
    class="smooth h-6 w-6 bg-[#eee] p-1 rounded shadow cursor-pointer text-[#444] hover:text-[#eee] hover:bg-[#444]"
    @click="handleDraw"
  >
    <svg-icon name="map-draw-polyline" class="h-full w-full" />
  </div>
</template>

<style scoped lang="scss"></style>
