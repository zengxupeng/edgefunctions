/**
 * 判断字符串是否是小写
 * @param string 字符串
 * @returns {boolean}
 */
export function isLowerCase (string) {
    return typeof string === 'string' && string === string.toLowerCase()
}

/**
 * 判断字符串是否是大写
 * @param string 字符串
 * @returns {boolean}
 */
export function isUpperCase (string) {
    return typeof string === 'string' && string === string.toUpperCase()
}

/**
 * 判断字符串是否不含有有效字符
 * @param string 字符串
 * @returns {boolean}
 */
export function isBlank (string) {
    if (string == null) {
        return true
    }
    const charNumber = string.length
    if (charNumber === 0) {
        return true
    }
    for (let i = 0; i < charNumber; i++) {
        const c = string.charAt(i)
        if (!/\s/.test(c)) {
            return false
        }
    }
    return true
}

/**
 * 判断字符串是否含有有效字符
 * @param string 字符串
 * @returns {boolean}
 */
export function isNotBlank (string) {
    if (string == null) {
        return false
    }
    const charNumber = string.length
    if (charNumber === 0) {
        return false
    }
    for (let i = 0; i < charNumber; i++) {
        const c = string.charAt(i)
        if (!/\s/.test(c)) {
            return true
        }
    }
    return false
}

/**
 * 字符串为空时返回默认字符串
 * @param string 字符串
 * @param defaultString 默认字符串
 * @returns {*}
 */
export function defaultIfBlank (string, defaultString) {
    return isBlank(string) ? defaultString : string
}

/**
 * Emoji正则
 */
const emojiRegExp = /[\u{1F600}-\u{1F64F}]/u

/**
 * 判断字符串是否包含Emoji
 * @param string 字符串
 * @returns {boolean}
 */
export function containsEmoji (string) {
    return emojiRegExp.test(string)
}

/**
 * 首字母转小写
 * @param string 字符串
 * @returns {*|string}
 */
export function firstLetterLowerCase (string) {
    if (!string) {
        return string
    }
    return string.charAt(0).toLowerCase() + string.slice(1)
}

/**
 * 首字母转大写
 * @param string 字符串
 * @returns {*|string}
 */
export function firstLetterUpperCase (string) {
    if (!string) {
        return string
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 下划线转驼峰
 * @param string 字符串
 * @returns {string|null}
 */
export function underscoreToCamelCase (string) {
    if (string === null) {
        return null
    }
    const stringLength = string.length
    if (stringLength === 0) {
        return ''
    }
    let result = ''
    let upperCaseFlag = false
    for (let i = 0; i < stringLength; i++) {
        const char = string[i]
        if (char === '_') {
            upperCaseFlag = true
            continue
        }
        if (!upperCaseFlag) {
            result += char
        } else {
            result += char.toUpperCase()
            upperCaseFlag = false
        }
    }
    return result
}

/**
 * 驼峰转下划线
 * @param string 字符串
 * @returns {string|null}
 */
export function camelCaseToUnderscore (string) {
    if (string === null) {
        return null
    }
    const stringLength = string.length
    if (stringLength === 0) {
        return ''
    }
    let result = ''
    for (let i = 0; i < stringLength; i++) {
        const char = string[i]
        if (/[A-Z]/.test(char)) {
            if (result) {
                result += '_'
            }
            result += char.toLowerCase()
        } else {
            result += char
        }
    }
    return result
}

/**
 * 字母和数字字符数组
 */
const letterAndNumberChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

/**
 * 生成随机字符串
 *
 * @param {number} charNumber 字符数量
 * @return {string}
 */
export function random (charNumber) {
    let randomString = ''
    for (let i = 0; i < charNumber; i++) {
        const index = Math.floor(Math.random() * 62)
        randomString += letterAndNumberChars[index]
    }
    return randomString
}

export default {
    isLowerCase,
    isUpperCase,
    isBlank,
    isNotBlank,
    defaultIfBlank,
    containsEmoji,
    firstLetterLowerCase,
    firstLetterUpperCase,
    underscoreToCamelCase,
    camelCaseToUnderscore,
    random
}
