/**
 * 判断对象是否是数字
 * @param object 对象
 * @returns {boolean}
 */
export function isNumber (object) {
    if (typeof object === 'number') {
        return isFinite(object)
    } else if (typeof object === 'string') {
        const number1 = +object
        const number2 = parseFloat(object)
        return number1 === number2 && isFinite(number2)
    }
    return false
}

/**
 * 加
 * @param number1 数字1
 * @param number2 数字2
 * @returns {number|null}
 */
export function add (number1, number2) {
    if (!isNumber(number1) || !isNumber(number2)) {
        return null
    }
    const decimalLength1 = getDecimalLength(number1)
    const decimalLength2 = getDecimalLength(number2)
    const multiplier = Math.pow(10, Math.max(decimalLength1, decimalLength2))
    return (number1 * multiplier + number2 * multiplier) / multiplier
}

/**
 * 减
 * @param number1 数字1
 * @param number2 数字2
 * @returns {number|null}
 */
export function subtract (number1, number2) {
    if (!isNumber(number1) || !isNumber(number2)) {
        return null
    }
    const decimalLength1 = getDecimalLength(number1)
    const decimalLength2 = getDecimalLength(number2)
    const multiplier = Math.pow(10, Math.max(decimalLength1, decimalLength2))
    return (number1 * multiplier - number2 * multiplier) / multiplier
}

/**
 * 乘
 * @param number1 数字1
 * @param number2 数字2
 * @returns {number|null}
 */
export function multiply (number1, number2) {
    if (!isNumber(number1) || !isNumber(number2)) {
        return null
    }
    const decimalLength1 = getDecimalLength(number1)
    const decimalLength2 = getDecimalLength(number2)
    const multiplier = Math.pow(10, Math.max(decimalLength1, decimalLength2))
    return (number1 * multiplier * number2 * multiplier) / (multiplier * multiplier)
}

/**
 * 除
 * @param number1 数字1
 * @param number2 数字2
 * @returns {number|null}
 */
export function divide (number1, number2) {
    if (!isNumber(number1) || !isNumber(number2)) {
        return null
    }
    const decimalLength1 = getDecimalLength(number1)
    const decimalLength2 = getDecimalLength(number2)
    const multiplier = Math.pow(10, Math.max(decimalLength1, decimalLength2))
    return (number1 * multiplier / number2 * multiplier) / multiplier
}

/**
 * 获取数字的小数长度
 * @param number 数字
 * @returns {number}
 */
function getDecimalLength (number) {
    const numberArr = number.toString().split('.')
    return (numberArr[1] || '').length
}

export default {
    isNumber,
    add,
    subtract,
    multiply,
    divide
}
