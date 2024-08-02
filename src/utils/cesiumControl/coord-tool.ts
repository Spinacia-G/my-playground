import * as proj4 from 'proj4'
import * as Cesium from 'cesium'
import { Cartesian3 } from 'cesium'

/**
 * 点位经纬度坐标系转换
 * @description 4490转4326
 * @param {[number, number]} coordinate
 * @returns {Cartesian3}
 */
export const transformCoordinateProj = (
  coordinate: [number, number]
): Cartesian3 => {
  const fromProjection = `GEOGCS["China Geodetic Coordinate System 2000",DATUM["China_2000",SPHEROID["CGCS2000",6378137,298.257222101,AUTHORITY["EPSG","1024"]],AUTHORITY["EPSG","1043"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4490"]]`

  const toProjection = `GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]`

  const newCoordinate = proj4(fromProjection, toProjection, coordinate)

  return Cesium.Cartesian3.fromDegrees(...newCoordinate, 0)
}
