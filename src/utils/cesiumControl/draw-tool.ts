import * as Cesium from 'cesium'

interface DrawOptions {
  isClear: boolean
}

/**
 * 绘制实体
 * @description
 * 支持的类型：
 * - 带图标的点
 * - 普通圆点
 * - 线
 * - 面
 * - 文本
 *
 * 绘制的参数：
 * - 贴地、贴面、贴模型
 * - 元素是否显示在最顶层
 * - 点的颜色、大小
 * - 图标的内容、大小、位置
 * - 线的颜色、类型、粗细、是否有每条线段的端点
 * - 面的描边颜色、填充颜色
 * - 文本的内容、颜色、大小、位置
 */
export class DrawTool {
  _viewer: Cesium.Viewer
  _handler: Cesium.ScreenSpaceEventHandler
  _drawEvt: Cesium.Event

  /* 是否正在绘制中 */
  _isDrawing: boolean = false
  /* 绘制得到的点位数组 */
  _pointsArr: Cesium.Cartesian3[] = []
  /* 绘制得到的实体集 */
  _drawCollection: Cesium.CustomDataSource
  DRAW_COLLECTION_NAME: string = 'draw-collection'

  /* 绘制参数 */
  _drawOptions: Partial<DrawOptions> = {}

  constructor(viewer: Cesium.Viewer, options?: Partial<DrawOptions>) {
    this._viewer = viewer
    this._handler = new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas)
    this._drawEvt = new Cesium.Event()
    this._drawCollection = new Cesium.CustomDataSource(this.DRAW_COLLECTION_NAME)
    this._viewer.dataSources.add(this._drawCollection)
    options && (this._drawOptions = { ...options })
  }

  get drawEvt() {
    return this._drawEvt
  }

  activate() {
    this._addDrawPolylineEvt()
  }

  inactivate() {
    // 移除所有监听事件
    this._handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
    this._handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    this._handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  }

  /**
   * 绘制线
   * @description
   * - 左键点击：开始绘制 / 添加点
   * - 鼠标移动：更新线
   * - 右键点击：结束绘制
   */
  _addDrawPolylineEvt() {
    this._handler.setInputAction((evt: Cesium.ScreenSpaceEventHandler.PositionedEvent) => {
      const pos: Cesium.Cartesian3 = this._viewer.scene.pickPosition(evt.position)
      if (!pos) return
      this._pointsArr.splice(-1, 1, pos, pos)
      if (!this._isDrawing) {
        this._isDrawing = true
        this._addTmpPolyline()
        this._handler.setInputAction((evt: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
          const pos: Cesium.Cartesian3 = this._viewer.scene.pickPosition(evt.endPosition)
          pos && this._pointsArr.splice(-1, 1, pos)
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
        this._handler.setInputAction(() => {
          this._isDrawing = false
          this._drawEvt.raiseEvent(this._pointsArr)
          this._handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
          this._handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)

          if (!this._drawOptions.isClear) {
            this._addPolyline()
          }

          this._pointsArr = []
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }

  _addTmpPolyline() {
    this._removeTmpPolyline()
    this._drawCollection.entities.add({
      id: 'tmp-polyline',
      polyline: {
        positions: new Cesium.CallbackProperty(() => {
          return this._pointsArr
        }, false),
        material: new Cesium.PolylineGlowMaterialProperty({
          color: Cesium.Color.fromCssColorString('rgb(255,200,0)'),
          glowPower: 0.25
        }),
        width: 5
      }
    })
  }

  _removeTmpPolyline() {
    this._drawCollection.entities.removeById('tmp-polyline')
  }

  _addPolyline() {
    this._removePolyline()
    this._drawCollection.entities.add({
      id: 'draw-polyline',
      polyline: {
        positions: this._pointsArr,
        material: new Cesium.PolylineGlowMaterialProperty({
          color: Cesium.Color.fromCssColorString('rgb(255,200,0)'),
          glowPower: 0.25
        }),
        width: 5
      }
    })
  }

  _removePolyline() {
    this._drawCollection.entities.removeById('draw-polyline')
  }
}
