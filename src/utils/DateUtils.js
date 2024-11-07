/**
 * 获取年份
 * @returns {number}
 */
export function getYear () {
    return new Date().getFullYear()
}

/**
 * 获取月份
 * @returns {number}
 */
export function getMonth () {
    return new Date().getMonth() + 1
}

/**
 * 获取日
 * @returns {number}
 */
export function getDay () {
    return new Date().getDate()
}

/**
 * 获取小时
 * @returns {number}
 */
export function getHour () {
    return new Date().getHours()
}

/**
 * 获取分钟
 * @returns {number}
 */
export function getMinute () {
    return new Date().getMinutes()
}

/**
 * 获取秒
 * @returns {number}
 */
export function getSecond () {
    return new Date().getSeconds()
}

/**
 * 年份加n
 * @param date 日期对象
 * @param number 数字
 * @returns {Date|null}
 */
export function addYears (date, number) {
    if (!(date instanceof Date)) {
        return null
    }
    date.setFullYear(date.getFullYear() + number)
    return date
}

/**
 * 月份加n
 * @param date 日期对象
 * @param number 数字
 * @returns {Date|null}
 */
export function addMonths (date, number) {
    if (!(date instanceof Date)) {
        return null
    }
    date.setMonth(date.getMonth() + number)
    return date
}

/**
 * 日加n
 * @param date 日期对象
 * @param number 数字
 * @returns {Date|null}
 */
export function addDays (date, number) {
    if (!(date instanceof Date)) {
        return null
    }
    date.setDate(date.getDate() + number)
    return date
}

/**
 * 小时加n
 * @param date 日期对象
 * @param number 数字
 * @returns {Date|null}
 */
export function addHours (date, number) {
    if (!(date instanceof Date)) {
        return null
    }
    date.setHours(date.getHours() + number)
    return date
}

/**
 * 分钟加n
 * @param date 日期对象
 * @param number 数字
 * @returns {Date|null}
 */
export function addMinutes (date, number) {
    if (!(date instanceof Date)) {
        return null
    }
    date.setMinutes(date.getMinutes() + number)
    return date
}

/**
 * 秒加n
 * @param date 日期对象
 * @param number 数字
 * @returns {Date|null}
 */
export function addSeconds (date, number) {
    if (!(date instanceof Date)) {
        return null
    }
    date.setSeconds(date.getSeconds() + number)
    return date
}

/**
 * 是否是同一天
 * @param date1 日期对象1
 * @param date2 日期对象2
 * @returns {boolean}
 */
export function isSameDay (date1, date2) {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
        return false
    }
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
}

/**
 * 是否是周末
 * @param date 日期对象
 * @returns {boolean}
 */
export function isWeekend (date) {
    if (!(date instanceof Date)) {
        return false
    }
    const weekDay = date.getDay()
    return weekDay === 0 || weekDay === 6
}

/**
 * 是否是上午
 * @param date 日期对象
 * @returns {boolean}
 */
export function isAm (date) {
    if (!(date instanceof Date)) {
        return false
    }
    const hour = date.getHours()
    return hour < 12
}

/**
 * 是否是下午
 * @param date 日期对象
 * @returns {boolean}
 */
export function isPm (date) {
    if (!(date instanceof Date)) {
        return false
    }
    const hour = date.getHours()
    return hour >= 12
}

/**
 * 将对象转为Date对象
 * @param object 对象
 * @returns {Date|null}
 */
export function parseDate (object) {
    if (object instanceof Date) {
        return object
    }
    const type = typeof object
    if (type === 'number') {
        const length = (object + '').length
        if (length === 10) {
            return new Date(+(object + '000'))
        } else if (length === 13) {
            return new Date(object)
        }
    } else if (type === 'string') {
        const length = object.length
        if (length === 10) {
            return new Date(object + ' 00:00:00')
        } else {
            return new Date(object)
        }
    }
    return null
}

/**
 * 格式化为年月日
 * @param date 日期对象
 * @returns {string|null}
 */
export function formatYMD (date) {
    if (!(date instanceof Date)) {
        return null
    }
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${fillZero(month)}-${fillZero(day)}`
}

/**
 * 格式化为年月日时分秒
 * @param date 日期对象
 * @returns {string|null}
 */
export function formatYMDHMS (date) {
    if (!(date instanceof Date)) {
        return null
    }
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return `${year}-${fillZero(month)}-${fillZero(day)} ${fillZero(hour)}:${fillZero(minute)}:${fillZero(second)}`
}

/**
 * 补零
 * @param value 值
 * @returns {string}
 */
function fillZero (value) {
    if (!value) {
        return '0'
    }
    if (typeof value !== 'string') {
        value = value.toString()
    }
    return value.padStart(2, '0')
}

export default {
    getYear,
    getMonth,
    getDay,
    getHour,
    getMinute,
    getSecond,
    addYears,
    addMonths,
    addDays,
    addHours,
    addMinutes,
    addSeconds,
    isSameDay,
    isWeekend,
    isAm,
    isPm,
    parseDate,
    formatYMD,
    formatYMDHMS
}
