import axios from 'axios'

/**
 * 实例集合
 */
const instances = {}

/**
 * 创建实例
 * @param baseUrl 基本路径
 * @param timeout 超时时间（毫秒）
 */
export function createInstance(baseUrl, timeout = 60000) {
    instances[baseUrl] = axios.create({
        baseURL: baseUrl,
        timeout: timeout
    })
}

/**
 * 增加请求拦截器
 * @param options 配置项
 */
export function addRequestInterceptor(options) {
    const urlString = options.urlString
    const successHandler = options.successHandler
    const failHandler = options.failHandler
    if (urlString) {
        const url = new URL(urlString)
        const instance = instances[url.origin]
        instance.interceptors.request.use(successHandler, failHandler)
    } else {
        for (const key in instances) {
            instances[key].interceptors.request.use(successHandler, failHandler)
        }
    }
}

/**
 * 增加响应拦截器
 * @param options 配置项
 */
export function addResponseInterceptor(options) {
    const urlString = options.urlString
    const successHandler = options.successHandler
    const failHandler = options.failHandler
    if (urlString) {
        const url = new URL(urlString)
        const instance = instances[url.origin]
        instance.interceptors.response.use(successHandler, failHandler)
    } else {
        for (const key in instances) {
            instances[key].interceptors.response.use(successHandler, failHandler)
        }
    }
}

/**
 * 发送GET请求
 * @param urlString url字符串
 * @param parameters 参数
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function get(urlString, parameters) {
    let url = {pathname: urlString}
    const startWithHttp = urlString.startsWith('http')
    if (startWithHttp) {
        try {
            url = new URL(urlString)
        } catch (e) {
            console.warn(`请求地址不正确, ${urlString}`)
        }
    }
    let instance = instances[url.origin]
    if (!instance) {
        const keyArr = Object.keys(instances)
        if (!startWithHttp || urlString.startsWith(keyArr[0])) {
            instance = Object.values(instances)[0]
        }
    }
    if (instance) {
        return instance.get(url.pathname, {params: parameters}, getHeaders(parameters))
    } else {
        return axios.get(urlString, {params: parameters}, getHeaders(parameters))
    }
}

/**
 * 发送POST请求
 * @param urlString url字符串
 * @param parameters 参数
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function post(urlString, parameters) {
    let url = {pathname: urlString}
    const startWithHttp = urlString.startsWith('http')
    if (startWithHttp) {
        try {
            url = new URL(urlString)
        } catch (e) {
            console.warn(`请求地址不正确, ${urlString}`)
        }
    }
    let instance = instances[url.origin]
    if (!instance) {
        const keyArr = Object.keys(instances)
        if (!startWithHttp || urlString.startsWith(keyArr[0])) {
            instance = Object.values(instances)[0]
        }
    }
    if (instance) {
        return instance.post(url.pathname, parameters, getHeaders(parameters))
    } else {
        return axios.post(urlString, parameters, getHeaders(parameters))
    }
}

/**
 * 发送PUT请求
 * @param urlString url字符串
 * @param parameters 参数
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function put(urlString, parameters) {
    let url = {pathname: urlString}
    const startWithHttp = urlString.startsWith('http')
    if (startWithHttp) {
        try {
            url = new URL(urlString)
        } catch (e) {
            console.warn(`请求地址不正确, ${urlString}`)
        }
    }
    let instance = instances[url.origin]
    if (!instance) {
        const keyArr = Object.keys(instances)
        if (!startWithHttp || urlString.startsWith(keyArr[0])) {
            instance = Object.values(instances)[0]
        }
    }
    if (instance) {
        return instance.put(url.pathname, parameters, getHeaders(parameters))
    } else {
        return axios.put(urlString, parameters, getHeaders(parameters))
    }
}

/**
 * 发送DELETE请求
 * @param urlString url字符串
 * @param parameters 参数
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function del(urlString, parameters) {
    let url = {pathname: urlString}
    const startWithHttp = urlString.startsWith('http')
    if (startWithHttp) {
        try {
            url = new URL(urlString)
        } catch (e) {
            console.warn(`请求地址不正确, ${urlString}`)
        }
    }
    let instance = instances[url.origin]
    if (!instance) {
        const keyArr = Object.keys(instances)
        if (!startWithHttp || urlString.startsWith(keyArr[0])) {
            instance = Object.values(instances)[0]
        }
    }
    if (instance) {
        return instance.delete(url.pathname, parameters, getHeaders(parameters))
    } else {
        return axios.delete(urlString, parameters, getHeaders(parameters))
    }
}

/**
 * 下载
 * @param urlString url字符串
 * @param parameters 参数
 * @param fileName 文件名
 */
export function download(urlString, parameters, fileName) {
    let url = {pathname: urlString}
    const startWithHttp = urlString.startsWith('http')
    if (startWithHttp) {
        try {
            url = new URL(urlString)
        } catch (e) {
            console.warn(`请求地址不正确, ${urlString}`)
        }
    }
    let instance = instances[url.origin]
    if (!instance) {
        const keyArr = Object.keys(instances)
        if (!startWithHttp || urlString.startsWith(keyArr[0])) {
            instance = Object.values(instances)[0]
        }
    }
    let promise
    if (instance) {
        promise = instance.get(url.pathname, {responseType: 'blob', params: parameters}, getHeaders(parameters))
    } else {
        promise = axios.get(urlString, {responseType: 'blob', params: parameters}, getHeaders(parameters))
    }
    return promise.then(response => {
        const a = document.createElement('a')
        a.style.display = 'none'
        const data = response.data
        const blob = new Blob([data], {type: data.type})
        const downloadUrl = URL.createObjectURL(blob)
        a.href = downloadUrl
        a.target = '_blank'
        fileName = fileName || getFileName(response.headers)
        if (fileName) {
            a.setAttribute('download', decodeURIComponent(fileName))
        }
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(downloadUrl)
        return Promise.resolve(response)
    }).catch(error => {
        return Promise.reject(error)
    })
}

/**
 * 获取请求头
 * @param parameters 参数
 * @returns {{}}
 */
function getHeaders(parameters) {
    const headers = {}
    if (typeof parameters === 'string') {
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
    } else if (Object.prototype.toString.call(parameters) === '[object Object]') {
        headers['Content-Type'] = 'application/json;charset=UTF-8'
    }
    return headers
}

/**
 * 从Http响应头中取出文件名
 * @param responseHeaders Http响应头
 * @returns {string|null}
 */
function getFileName(responseHeaders) {
    const contentDisposition = responseHeaders['content-disposition']
    if (!contentDisposition) {
        return null
    }
    const filenameIndex = contentDisposition.indexOf('filename=')
    if (filenameIndex === -1) {
        return null
    }
    return contentDisposition.substring(filenameIndex + 9)
}

export default {
    createInstance,
    addRequestInterceptor,
    addResponseInterceptor,
    get,
    post,
    put,
    del,
    download
}
