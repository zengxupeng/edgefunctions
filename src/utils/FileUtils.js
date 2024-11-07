/**
 * 获取文件头
 * @param binary 文件内容
 * @returns {Promise<string>}
 */
export function getFileHeader (binary) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onloadend = function (e) {
            let fileHeader = ''
            const uint8Array = new Uint8Array(e.target.result)
            for (let i = 0, len = uint8Array.length; i < len; i++) {
                fileHeader += uint8Array[i].toString(16).padStart(2, '0')
            }
            resolve(fileHeader)
        }
        if (isBinary(binary) && binary.size > 0) {
            fileReader.readAsArrayBuffer(binary.slice(0, 4))
        } else {
            reject(new Error(`文件不可用, binary: ${binary}`))
        }
    })
}

/**
 * 获取文件拓展名
 * @param fileName 文件名
 * @returns {string|null}
 */
export function getFileNameExtension (fileName) {
    if (typeof fileName !== 'string') {
        return null
    }
    const pointIndex = fileName.indexOf('.')
    return pointIndex > -1 ? fileName.substring(pointIndex + 1) : null
}

/**
 * 获取文件拓展名
 * @param file 文件
 * @returns {Promise<string>}
 */
export function getFileExtension (file) {
    if (!(file instanceof File)) {
        return null
    }
    const fileName = file.name
    const pointIndex = fileName.indexOf('.')
    return pointIndex > -1 ? fileName.substring(pointIndex + 1) : null
}

/**
 * 读取文件内容
 * @param binary 文件内容
 * @returns {Promise<string>}
 */
export function readAll (binary) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onloadend = function (e) {
            resolve(e.target.result)
        }
        if (isBinary(binary) && binary.size > 0) {
            fileReader.readAsText(binary, 'UTF-8')
        } else {
            reject(new Error(`文件不可用, binary: ${binary}`))
        }
    })
}

/**
 * 读取文件行
 * @param binary 文件内容
 * @returns {Promise<Array<string>>}
 */
export function readLines (binary) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onloadend = function (e) {
            const fileContent = e.target.result
            resolve(fileContent !== '' ? fileContent.split('\n') : [])
        }
        if (isBinary(binary) && binary.size > 0) {
            fileReader.readAsText(binary, 'UTF-8')
        } else {
            reject(new Error(`文件不可用, binary: ${binary}`))
        }
    })
}

/**
 * 文件头集合
 */
const imageFileHeaderMap = new Map([['ffd8ff', 'jpg/jpeg'], ['89504e47', 'png'], ['424d', 'bmp'], ['47494638', 'gif']])

/**
 * 判断文件是否是图片
 * @param file 文件
 * @returns {Promise<boolean>}
 */
export async function isImage (file) {
    const fileHeader = await getFileHeader(file)
    const imageFileHeaderArr = imageFileHeaderMap.keys()
    for (const imageFileHeader of imageFileHeaderArr) {
        if (fileHeader.startsWith(imageFileHeader)) {
            return true
        }
    }
    return false
}

/**
 * 文件内容转Base64
 * @param binary 文件内容
 * @returns {Promise<string>}
 */
export function binaryToBase64 (binary) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onloadend = function (e) {
            resolve(e.target.result)
        }
        if (isBinary(binary) && binary.size > 0) {
            fileReader.readAsDataURL(binary)
        } else {
            reject(new Error(`文件不可用, binary: ${binary}`))
        }
    })
}

/**
 * Base64转Blob
 * @param base64String Base64字符串
 * @param type 类型
 * @returns {Blob}
 */
export function base64ToBlob (base64String, type) {
    if (typeof base64String !== 'string') {
        throw new Error(`Base64不正确, Base64: ${base64String}`)
    }
    if (base64String.startsWith('data:')) {
        type = base64String.substring(5, base64String.indexOf(';'))
    }
    if (typeof type !== 'string') {
        throw new Error(`type不正确, type: ${type}`)
    }
    const dataUrlValue = base64String.substring(base64String.indexOf(',') + 1)
    const binaryString = atob(dataUrlValue)
    const binaryStringLength = binaryString.length
    const uint8Arr = new Uint8Array(binaryStringLength)
    for (let i = 0; i < binaryStringLength; i++) {
        uint8Arr[i] = binaryString.charCodeAt(i)
    }
    return new Blob([uint8Arr], { type: type })
}

/**
 * Base64转文件
 * @param fileName 文件名称
 * @param base64String Base64字符串
 * @param type 类型
 * @returns {File}
 */
export function base64ToFile (fileName, base64String, type) {
    if (!fileName) {
        throw new Error(`文件名不正确, fileName: ${fileName}`)
    }
    if (typeof base64String !== 'string') {
        throw new Error(`Base64不正确, Base64: ${base64String}`)
    }
    if (base64String.startsWith('data:')) {
        type = base64String.substring(5, base64String.indexOf(';'))
    }
    if (typeof type !== 'string') {
        throw new Error(`type不正确, type: ${type}`)
    }
    const dataUrlValue = base64String.substring(base64String.indexOf(',') + 1)
    const binaryString = atob(dataUrlValue)
    const binaryStringLength = binaryString.length
    const uint8Arr = new Uint8Array(binaryStringLength)
    for (let i = 0; i < binaryStringLength; i++) {
        uint8Arr[i] = binaryString.charCodeAt(i)
    }
    return new File([uint8Arr], fileName, {
        type: type
    })
}

/**
 * 压缩图片
 * @param binary 文件内容
 * @param zoomRatio 缩放比例
 * @param compressRatio 压缩比例
 * @returns {Promise<Blob|File>}
 */
export function compressImage (binary, zoomRatio, compressRatio) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onloadend = function (e) {
            const image = new Image()
            image.src = e.target.result
            image.onload = async function () {
                let imageWidth = image.width
                let imageHeight = image.height
                if (typeof zoomRatio !== 'number') {
                    zoomRatio = imageWidth > 1920 && imageHeight > 1080 ? 0.5 : 0.75
                }
                if (typeof compressRatio !== 'number') {
                    compressRatio = 0.7
                }
                imageWidth = Math.floor(imageWidth * zoomRatio)
                imageHeight = Math.floor(imageHeight * zoomRatio)
                const canvas = document.createElement('canvas')
                canvas.width = imageWidth
                canvas.height = imageHeight
                const context = canvas.getContext('2d')
                context.drawImage(image, 0, 0, imageWidth, imageHeight)
                const dataUrl = canvas.toDataURL('image/jpeg', compressRatio)
                const response = await fetch(dataUrl)
                const blob = await response.blob()
                if (Object.prototype.toString.call(binary) === '[object File]') {
                    const compressedFile = new File([blob], binary.name, {
                        type: 'image/jpeg'
                    })
                    resolve(compressedFile)
                } else if (Object.prototype.toString.call(binary) === '[object Blob]') {
                    resolve(blob)
                }
            }
        }
        if (isBinary(binary) && binary.size > 0) {
            fileReader.readAsDataURL(binary)
        } else {
            reject(new Error(`文件不可用, binary: ${binary}`))
        }
    })
}

/**
 * 判断对象是否是二进制数据对象
 * @param object 对象
 * @returns {boolean}
 */
function isBinary (object) {
    return object instanceof Blob || object instanceof File
}

export default {
    getFileHeader,
    getFileNameExtension,
    getFileExtension,
    readAll,
    readLines,
    isImage,
    binaryToBase64,
    base64ToBlob,
    base64ToFile,
    compressImage
}
