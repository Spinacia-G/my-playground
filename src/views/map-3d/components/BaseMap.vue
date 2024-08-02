<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import * as Cesium from 'cesium'
import { transformCoordinateProj } from '@/utils/cesiumControl/coord-tool.ts'

const viewer = shallowRef()
onMounted(() => {
  /* 配置token */
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlN2E5ZmYzNS1lOGMyLTRkNDYtOTZhYy1jNzc5YWM2MThmMjMiLCJpZCI6MTI2NDE4LCJpYXQiOjE3MTU1NjM1ODd9.5A_CuWM7womhJ9zQFQbwh7UN7vMzAjxo87UZJ4WcnMs'

  /* 配置GeoJSON数据的坐标系 */
  Cesium.GeoJsonDataSource.crsNames['urn:ogc:def:crs:EPSG::4490'] =
    Cesium.GeoJsonDataSource.crsNames['EPSG:4490'] = transformCoordinateProj

  /* 初始化Viewer */
  viewer.value = new Cesium.Viewer('map-3d-container', {
    /* 配置地形 */
    terrain: Cesium.Terrain.fromWorldTerrain(),
    /* 隐藏Cesium的默认组件 */
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false
  })

  /* 隐藏logo */
  viewer.value.cesiumWidget.creditContainer.style.display = 'none'

  /* 相机位置初始化 */
  viewer.value.camera.flyTo({
    destination: {
      x: -2921437.423410508,
      y: 4757057.175874218,
      z: 3077200.0004493715
    },
    orientation: {
      heading: 0.13786544233996167,
      pitch: -0.659093357347059,
      roll: 0
    }
  })

  /* for debug */
  window.Cesium = Cesium
  window.viewer = viewer.value
})
</script>

<template>
  <div class="h-full w-full" id="map-3d-container" />
</template>
