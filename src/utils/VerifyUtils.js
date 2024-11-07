/**
 * IP地址正则
 */
export const IP_REGEXP = /^((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/

/**
 * 判断是否是IP地址
 * @param string 字符串
 * @returns {boolean}
 */
export function isIp (string) {
    return IP_REGEXP.test(string)
}

/**
 * http url正则
 */
export const HTTP_URL_REGEXP = /^http:\/\/(([a-z\d]([a-z\d-]*[a-z\d])*\.)+[a-z]{2,}|((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]))(\/[^\s]*)?$/i

/**
 * 校验url协议
 * @param string 字符串
 * @returns {boolean}
 */
export function isHttpProtocol (string) {
    return HTTP_URL_REGEXP.test(string)
}

/**
 * https url正则
 */
export const HTTPS_URL_REGEXP = /^https:\/\/((([a-z\d]([a-z\d-]*[a-z\d])*\.)+[a-z]{2,}|((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]))(\/[^\s]*)?)$/i

/**
 * 校验url协议
 * @param string 字符串
 * @returns {boolean}
 */
export function isHttpsProtocol (string) {
    return HTTPS_URL_REGEXP.test(string)
}

/**
 * 网络地址正则
 */
export const NETWORK_URL_REGEXP = /^https?:\/\/((([a-z\d]([a-z\d-]*[a-z\d])*\.)+[a-z]{2,}|((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5]))(\/[^\s]*)?)$/i

/**
 * 校验url地址
 * @param string 字符串
 * @returns {boolean}
 */
export function isNetworkUrl (string) {
    return NETWORK_URL_REGEXP.test(string)
}

/**
 * 姓名正则
 */
export const FULL_NAME_REGEXP = /^[\u4E00-\u9FA5]{2,6}$/

/**
 * 校验姓名
 * @param string 字符串
 * @returns {boolean}
 */
export function checkFullName (string) {
    return FULL_NAME_REGEXP.test(string)
}

/**
 * 省份集合
 */
const provinceMap = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
}

/**
 * 身份证号加权因子
 */
const idNumberWeightingFactors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]

/**
 * 身份证号校验码
 */
const idNumberCheckCodes = '10X98765432'

/**
 * 校验身份证号
 * @param idNumber 身份证号
 * @returns {boolean}
 */
export function checkIdNumber (idNumber) {
    if (!idNumber) {
        return false
    }
    const idNumberLength = idNumber.length
    if (idNumberLength !== 15 && idNumberLength !== 18) {
        return false
    }
    if (!provinceMap[idNumber.substring(0, 2)]) {
        return false
    }
    const isFifteen = idNumberLength === 15
    let birthday
    if (isFifteen) {
        birthday = `19${idNumber.substring(6, 8)}-${idNumber.substring(8, 10)}-${idNumber.substring(10, 12)}`
    } else {
        birthday = `${idNumber.substring(6, 10)}-${idNumber.substring(10, 12)}-${idNumber.substring(12, 14)}`
    }
    const date = new Date(birthday)
    if (birthday !== `${date.getFullYear()}-${fillZero(date.getMonth() + 1)}-${fillZero(date.getDate())}`) {
        return false
    }
    let power = 0
    for (let i = 0; i < 17; i++) {
        if (idNumberLength[i] < '0' || idNumberLength[i] > '9') {
            return false
        }
        power += (idNumber.charAt(i) - '0') * idNumberWeightingFactors[i]
    }
    return isFifteen || idNumber[17].toUpperCase() === idNumberCheckCodes[power % 11]
}

/**
 * 校验出生日期
 * @param birthday 出生日期
 * @returns {boolean}
 */
export function checkBirthday (birthday) {
    if (typeof birthday !== 'string') {
        return false
    }
    const date = new Date(birthday)
    return birthday === `${date.getFullYear()}-${fillZero(date.getMonth() + 1)}-${fillZero(date.getDate())}`
}

/**
 * 手机号码正则
 */
export const PHONE_REGEXP = /(13[0-9]|14[06]|15[0-35-9]|16[6]|17[0-35-9]|18[0-9]|19[0-35-9])\\d{8}/

/**
 * 校验手机号码
 *
 * @param string 字符串
 * @return
 */
export function checkPhone (string) {
    return PHONE_REGEXP.test(string)
}

/**
 * 电子邮箱正则
 */
export const EMAIL_REGEXP = /[0-9a-zA-Z]+@(qq.com|gmail.com|hotmail.com|yahoo.com|outlook.com|126.com|139.com|163.com)/

/**
 * 校验电子邮箱
 *
 * @param string 字符串
 * @return
 */
export function checkEmail (string) {
    return EMAIL_REGEXP.test(string)
}

/**
 * 校验银行卡号
 * @param bankCardNumber 银行卡号
 * @returns {boolean}
 */
export function checkBankCardNumber (bankCardNumber) {
    if (bankCardNumber === null) {
        return false
    }
    const bankCardNumberLength = bankCardNumber.length
    if (bankCardNumberLength !== 16 && bankCardNumberLength !== 19) {
        return false
    }
    const bankCardNumberWithoutCheckCode = bankCardNumber.slice(0, bankCardNumberLength - 1)
    let luhnSum = 0
    for (let i = 0, j = bankCardNumberWithoutCheckCode.length - 1; j >= 0; i++, j--) {
        let k = +bankCardNumberWithoutCheckCode[j]
        if (i % 2 === 0) {
            k *= 2
            k = Math.floor(k / 10) + k % 10
        }
        luhnSum += k
    }
    const remainder = luhnSum % 10
    const c = remainder !== 0 ? String.fromCharCode(10 - remainder + 48) : '0'
    return c === bankCardNumber.charAt(bankCardNumberLength - 1)
}

/**
 * 统一社会信用代码机构类型集合
 */
const unifiedSocialCreditCodeOrganizationTypeList = ['11', '12', '13', '19', '21', '29', '31', '32', '33', '34', '35', '39', '41', '49', '51', '52', '53', '59', '61', '62', '69', '71', '72', '79', '81', '89', '91', '92', '93', 'A1', 'A9', 'N1', 'N2', 'N3', 'N9', 'Y1']

/**
 * 统一社会信用代码校验码
 */
const UNIFIED_SOCIAL_CREDIT_CODE_CHECK_CODE = '0123456789ABCDEFGHJKLMNPQRTUWXY'

/**
 * 统一社会信用代码加权因子
 */
const unifiedSocialCreditCodeWeightingFactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]

/**
 * 校验统一社会信用代码
 * @param unifiedSocialCreditCode 统一社会信用代码
 * @returns {boolean}
 */
export function checkUnifiedSocialCreditCode (unifiedSocialCreditCode) {
    if (unifiedSocialCreditCode === null) {
        return false
    }
    const unifiedSocialCreditCodeLength = unifiedSocialCreditCode.length
    if (unifiedSocialCreditCodeLength !== 18) {
        return false
    }
    if (!unifiedSocialCreditCodeOrganizationTypeList.includes(unifiedSocialCreditCode.substring(0, 2))) {
        return false
    }
    if (!provinceMap[unifiedSocialCreditCode.substring(2, 4)]) {
        return false
    }
    let sum = 0
    for (let i = 0; i < 17; i++) {
        const c = unifiedSocialCreditCode.charAt(i)
        const index = UNIFIED_SOCIAL_CREDIT_CODE_CHECK_CODE.indexOf(c)
        if (index === -1) {
            return false
        }
        sum += index * unifiedSocialCreditCodeWeightingFactors[i]
    }
    const checkCodeIndex = 31 - sum % 31
    return unifiedSocialCreditCode.charAt(17) === UNIFIED_SOCIAL_CREDIT_CODE_CHECK_CODE.charAt(checkCodeIndex)
}

/**
 * 补零
 * @param value 值
 * @returns {number|string|null}
 */
function fillZero (value) {
    if (typeof value !== 'number') {
        return null
    }
    return value >= 10 ? value : '0' + value
}

export default {
    isIp,
    isHttpProtocol,
    isHttpsProtocol,
    isNetworkUrl,
    checkFullName,
    checkIdNumber,
    checkBirthday,
    checkPhone,
    checkEmail,
    checkBankCardNumber,
    checkUnifiedSocialCreditCode
}
