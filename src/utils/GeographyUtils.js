/**
 * 地球半径（米）
 */
const EARTH_RADIUS = 6378137.0

/**
 * 计算两点之间的距离（米）
 * @param longitude1 经度1
 * @param latitude1 纬度1
 * @param longitude2 经度2
 * @param latitude2 纬度2
 * @returns {number}
 */
export function getDistance (longitude1, latitude1, longitude2, latitude2) {
    if (!isNumber(longitude1) || !isNumber(latitude1) || !isNumber(longitude2) || !isNumber(latitude2)) {
        return 0
    }
    const longitudeRadian1 = toRadians(longitude1)
    const latitudeRadian1 = toRadians(latitude1)
    const longitudeRadian2 = toRadians(longitude2)
    const latitudeRadian2 = toRadians(latitude2)
    const distance = 2 * EARTH_RADIUS * Math.asin(Math.sqrt(Math.pow(Math.sin((longitudeRadian1 - longitudeRadian2) / 2), 2) * Math.cos(latitudeRadian1) * Math.cos(latitudeRadian2) + Math.pow(Math.sin((latitudeRadian1 - latitudeRadian2) / 2), 2)))
    return +distance.toFixed(2)
}

/**
 * 将坐标转为弧度
 * @param coordinate 坐标
 * @returns {number}
 */
function toRadians (coordinate) {
    return coordinate * (Math.PI / 180)
}

/**
 * 判断坐标点是否在两个坐标点连成的线段上
 * @param longitude1 连线点-经度1
 * @param latitude1 连线点-纬度1
 * @param longitude2 连线点-经度2
 * @param latitude2 连线点-纬度2
 * @param longitude3 点-经度3
 * @param latitude3 点-纬度3
 * @param deviation 偏差（米）
 * @returns {boolean}
 */
export function onPointsLine (longitude1, latitude1, longitude2, latitude2, longitude3, latitude3, deviation = 0) {
    if (!isNumber(longitude1) || !isNumber(latitude1) || !isNumber(longitude2) || !isNumber(latitude2) || !isNumber(longitude3) || !isNumber(latitude3) || !isNumber(deviation)) {
        return false
    }
    if ((longitude1 === longitude2 && longitude1 === longitude3) || (latitude1 === latitude2 && latitude1 === latitude3)) {
        return true
    }
    const distance1 = getDistance(longitude1, latitude1, longitude3, latitude3)
    const distance2 = getDistance(longitude2, latitude2, longitude3, latitude3)
    const lineDistance = getDistance(longitude1, latitude1, longitude2, latitude2)
    return Math.abs(distance1 + distance2 - lineDistance) <= deviation
}

/**
 * 获取中心点坐标
 * @param coordinates 坐标数组
 * @returns {number[]|null}
 */
export function getCenterPoint (coordinates) {
    if (!Array.isArray(coordinates)) {
        return null
    }
    coordinates = coordinates.filter(coordinate => {
        if (!Array.isArray(coordinate)) {
            return false
        }
        return isNumber(coordinate[0]) && isNumber(coordinate[1])
    })
    const pointNumber = coordinates.length
    if (pointNumber < 2) {
        return null
    }
    let longitude = 0
    let latitude = 0
    coordinates.forEach(coordinate => {
        longitude += coordinate[0]
        latitude += coordinate[1]
    })
    longitude = (longitude / pointNumber).toFixed(6)
    latitude = (latitude / pointNumber).toFixed(6)
    return [+longitude, +latitude]
}

/**
 * 判断坐标是否在指定坐标范围内
 * @param coordinates 坐标数组
 * @param longitude 经度
 * @param latitude 纬度
 * @returns {boolean}
 */
export function withinBounds (coordinates, longitude, latitude) {
    if (!Array.isArray(coordinates) || !isNumber(longitude) || !isNumber(latitude)) {
        return false
    }
    coordinates = coordinates.filter(coordinate => {
        if (!Array.isArray(coordinate)) {
            return false
        }
        return isNumber(coordinate[0]) && isNumber(coordinate[1])
    })
    const pointNumber = coordinates.length
    if (pointNumber < 3) {
        return false
    }
    let count = 0
    for (let i = 0; i < pointNumber; i++) {
        const coordinate = coordinates[i]
        if (longitude === coordinate[0] && latitude === coordinate[1]) {
            return true
        }
        let longitude1, latitude1, longitude2, latitude2
        if (i < pointNumber - 1) {
            longitude1 = coordinate[0]
            latitude1 = coordinate[1]
            longitude2 = coordinates[i + 1][0]
            latitude2 = coordinates[i + 1][1]
        } else {
            longitude1 = coordinate[0]
            latitude1 = coordinate[1]
            longitude2 = coordinates[0][0]
            latitude2 = coordinates[0][1]
        }
        if ((latitude >= latitude1 && latitude < latitude2) || (latitude >= latitude2 && latitude < latitude1)) {
            if (Math.abs(latitude1 - latitude2) > 0 && longitude > (longitude1 - (longitude1 - longitude2) * (latitude1 - latitude) / (latitude1 - latitude2))) {
                count++
            }
        }
    }
    return count % 2 !== 0
}

/**
 * 1米的经度
 */
const ONE_METER_LONGITUDE = 0.000008990970143910217

/**
 * 经度加长
 * @param coordinate 坐标
 * @param meters n米
 * @returns {number}
 */
export function addLongitudeMeters (coordinate, meters) {
    coordinate += meters * ONE_METER_LONGITUDE
    return +coordinate.toFixed(6)
}

/**
 * 1米的纬度
 */
const ONE_METER_LATITUDE = 0.000008993216192195822

/**
 * 纬度加长
 * @param coordinate 坐标
 * @param meters n米
 * @returns {number}
 */
export function addLatitudeMeters (coordinate, meters) {
    coordinate += meters * ONE_METER_LATITUDE
    return +coordinate.toFixed(6)
}

/**
 * 坐标转换度分秒
 * @param coordinate 坐标
 * @returns {string|null}
 */
export function parseDegree (coordinate) {
    if (!isNumber(coordinate)) {
        return null
    }
    const du = Math.floor(coordinate)
    const tp = (coordinate - du) * 60
    const fen = Math.floor(tp)
    const miao = ((tp - fen) * 60).toFixed(2)
    return `${du}°${Math.abs(fen)}'${Math.abs(miao)}"`
}

/**
 * 度分秒转换坐标
 * @param degreeMinuteSecond 度分秒
 * @returns {number|null}
 */
export function parseCoordinate (degreeMinuteSecond) {
    if (degreeMinuteSecond === null || degreeMinuteSecond.length < 6) {
        return null
    }
    const degreeAndMinuteSecondArr = degreeMinuteSecond.split('°')
    if (degreeAndMinuteSecondArr.length < 2) {
        return null
    }
    const minuteAndSecondArr = degreeAndMinuteSecondArr[1].split('\'')
    if (minuteAndSecondArr.length < 2) {
        return null
    }
    const du = Math.floor(degreeAndMinuteSecondArr[0])
    const fen = Math.floor(minuteAndSecondArr[0])
    const miao = +minuteAndSecondArr[1].slice(0, -1)
    let coordinate = Math.abs(du) + ((fen + (miao / 60)) / 60)
    coordinate = Math.round(coordinate * 1000000) / 1000000
    return du >= 0 ? coordinate : -coordinate
}

/**
 * PI
 */
const PI = Math.PI
/**
 * 偏心率的平方
 */
const EE = 0.00669342162296594323
/**
 * 长轴半径
 */
const MAJOR_AXIS_RADIUS = 6378245.0

/**
 * WGS-84转GCJ-02
 * @param longitude 经度
 * @param latitude 纬度
 * @returns {*|null}
 */
export function wgs84ToGcj02 (longitude, latitude) {
    if (!isNumber(longitude) || !isNumber(latitude)) {
        return null
    }
    const coordinates = transform(longitude, latitude)
    coordinates[0] = +coordinates[0].toFixed(6)
    coordinates[1] = +coordinates[1].toFixed(6)
    return coordinates
}

/**
 * GCJ-02转WGS-84
 * @param longitude 经度
 * @param latitude 纬度
 * @returns {*|null}
 */
export function gcj02ToWgs84 (longitude, latitude) {
    if (!isNumber(longitude) || !isNumber(latitude)) {
        return null
    }
    const coordinates = transform(longitude, latitude)
    coordinates[0] = +(longitude - (coordinates[0] - longitude)).toFixed(6)
    coordinates[1] = +(latitude - (coordinates[1] - latitude)).toFixed(6)
    return coordinates
}

function transform (longitude, latitude) {
    let deltaLongitude = transformLongitude(longitude - 105.0, latitude - 35.0)
    let deltaLatitude = transformLatitude(longitude - 105.0, latitude - 35.0)
    const radLatitude = latitude / 180.0 * PI
    let magic = Math.sin(radLatitude)
    magic = 1 - EE * magic * magic
    const sqrtMagic = Math.sqrt(magic)
    deltaLatitude = (deltaLatitude * 180.0) / ((MAJOR_AXIS_RADIUS * (1 - EE)) / (magic * sqrtMagic) * PI)
    deltaLongitude = (deltaLongitude * 180.0) / (MAJOR_AXIS_RADIUS / sqrtMagic * Math.cos(radLatitude) * PI)
    return [longitude + deltaLongitude, latitude + deltaLatitude]
}

function transformLongitude (longitude, latitude) {
    let deltaLongitude = 300.0 + longitude + 2.0 * latitude + 0.1 * longitude * longitude + 0.1 * longitude * latitude + 0.1 * Math.sqrt(Math.abs(longitude))
    deltaLongitude += (20.0 * Math.sin(6.0 * longitude * PI) + 20.0 * Math.sin(2.0 * longitude * PI)) * 2.0 / 3.0
    deltaLongitude += (20.0 * Math.sin(longitude * PI) + 40.0 * Math.sin(longitude / 3.0 * PI)) * 2.0 / 3.0
    deltaLongitude += (150.0 * Math.sin(longitude / 12.0 * PI) + 300.0 * Math.sin(longitude / 30.0 * PI)) * 2.0 / 3.0
    return deltaLongitude
}

function transformLatitude (longitude, latitude) {
    let deltaLatitude = -100.0 + 2.0 * longitude + 3.0 * latitude + 0.2 * latitude * latitude + 0.1 * longitude * latitude + 0.2 * Math.sqrt(Math.abs(longitude))
    deltaLatitude += (20.0 * Math.sin(6.0 * longitude * PI) + 20.0 * Math.sin(2.0 * longitude * PI)) * 2.0 / 3.0
    deltaLatitude += (20.0 * Math.sin(latitude * PI) + 40.0 * Math.sin(latitude / 3.0 * PI)) * 2.0 / 3.0
    deltaLatitude += (160.0 * Math.sin(latitude / 12.0 * PI) + 320 * Math.sin(latitude * PI / 30.0)) * 2.0 / 3.0
    return deltaLatitude
}

const X_PI = 52.35987755982988

/**
 * GCJ-02转DB-09
 * @param longitude 经度
 * @param latitude 纬度
 * @returns {number[]|null}
 */
export function gcj02ToBd09 (longitude, latitude) {
    if (!isNumber(longitude) || !isNumber(latitude)) {
        return null
    }
    const z = Math.sqrt(longitude * longitude + latitude * latitude) + 0.00002 * Math.sin(latitude * X_PI)
    const theta = Math.atan2(latitude, longitude) + 0.000003 * Math.cos(longitude * X_PI)
    longitude = +(z * Math.cos(theta) + 0.0065).toFixed(6)
    latitude = +(z * Math.sin(theta) + 0.006).toFixed(6)
    return [longitude, latitude]
}

/**
 * DB-09转GCJ-02
 * @param longitude 经度
 * @param latitude 纬度
 * @returns {number[]|null}
 */
export function bd09ToGcj02 (longitude, latitude) {
    if (!isNumber(longitude) || !isNumber(latitude)) {
        return null
    }
    longitude = longitude - 0.0065
    latitude = latitude - 0.006
    const z = Math.sqrt(longitude * longitude + latitude * latitude) - 0.00002 * Math.sin(latitude * X_PI)
    const theta = Math.atan2(latitude, longitude) - 0.000003 * Math.cos(longitude * X_PI)
    longitude = +(z * Math.cos(theta)).toFixed(6)
    latitude = +(z * Math.sin(theta)).toFixed(6)
    return [longitude, latitude]
}

/**
 * 判断对象是否是数字
 * @param object 对象
 * @returns {boolean}
 */
function isNumber (object) {
    if (typeof object === 'number') {
        return isFinite(object)
    } else if (typeof object === 'string') {
        const number1 = +object
        const number2 = parseFloat(object)
        return number1 === number2 && isFinite(number2)
    }
    return false
}

export default {
    getDistance,
    onPointsLine,
    getCenterPoint,
    withinBounds,
    addLongitudeMeters,
    addLatitudeMeters,
    parseDegree,
    parseCoordinate,
    wgs84ToGcj02,
    gcj02ToWgs84,
    gcj02ToBd09,
    bd09ToGcj02
}
