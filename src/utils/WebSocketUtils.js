/**
 * 实例集合
 */
const instances = {}
let currentName = 'default'

/**
 * 初始化WebSocket
 * @param urlString 连接地址
 */
export function init (urlString) {
    initWithName(undefined, urlString)
}

/**
 * 初始化WebSocket
 * @param name 名称
 * @param urlString 连接地址
 */
export function initWithName (name = 'default', urlString) {
    if (typeof urlString !== 'string' || urlString.length <= 10) {
        throw new Error(`WebSocket连接地址不正确, name: ${name}, url: ${urlString}`)
    }
    const webSocket = instances[name]
    if (webSocket && webSocket.readyState === 1) {
        return
    }
    instances[name] = new WebSocket(urlString)
}

/**
 * 注册WebSocket打开事件的处理函数
 * @param handler 处理函数
 */
export function registerOnOpenHandler (handler) {
    registerOnOpenHandlerWithName(undefined, handler)
}

/**
 * 注册WebSocket打开事件的处理函数
 * @param name 名称
 * @param handler 处理函数
 */
export function registerOnOpenHandlerWithName (name = 'default', handler) {
    const webSocket = instances[name]
    if (webSocket) {
        if (typeof handler !== 'function') {
            throw new Error(`WebSocket处理函数不正确, handler: ${handler}`)
        }
        webSocket.onopen = handler
    } else {
        throw new Error(`WebSocket未初始化, name: ${name}`)
    }
}

/**
 * 注册WebSocket接收到消息事件的处理函数
 * @param handler 处理函数
 */
export function registerOnMessageHandler (handler) {
    registerOnMessageHandlerWithName(undefined, handler)
}

/**
 * 注册WebSocket接收到消息事件的处理函数
 * @param name 名称
 * @param handler 处理函数
 */
export function registerOnMessageHandlerWithName (name = 'default', handler) {
    const webSocket = instances[name]
    if (webSocket) {
        if (typeof handler !== 'function') {
            throw new Error(`WebSocket处理函数不正确, handler: ${handler}`)
        }
        webSocket.onmessage = handler
    } else {
        throw new Error(`WebSocket未初始化, name: ${name}`)
    }
}

/**
 * 注册WebSocket关闭事件的处理函数
 * @param handler 处理函数
 */
export function registerOnCloseHandler (handler) {
    registerOnCloseHandlerWithName(undefined, handler)
}

/**
 * 注册WebSocket关闭事件的处理函数
 * @param name 名称
 * @param handler 处理函数
 */
export function registerOnCloseHandlerWithName (name = 'default', handler) {
    const webSocket = instances[name]
    if (webSocket) {
        if (typeof handler !== 'function') {
            throw new Error(`WebSocket处理函数不正确, handler: ${handler}`)
        }
        webSocket.onclose = handler
    } else {
        throw new Error(`WebSocket未初始化, name: ${name}`)
    }
}

/**
 * 注册WebSocket发生错误事件的处理函数
 * @param handler 处理函数
 */
export function registerOnErrorHandler (handler) {
    registerOnErrorHandlerWithName(undefined, handler)
}

/**
 * 注册WebSocket发生错误事件的处理函数
 * @param name 名称
 * @param handler 处理函数
 */
export function registerOnErrorHandlerWithName (name = 'default', handler) {
    const webSocket = instances[name]
    if (webSocket) {
        if (typeof handler !== 'function') {
            throw new Error(`WebSocket处理函数不正确, handler: ${handler}`)
        }
        webSocket.onerror = handler
    } else {
        throw new Error(`WebSocket未初始化, name: ${name}`)
    }
}

/**
 * 切换WebSocket
 * @param name 名称
 */
export function change (name = 'default') {
    currentName = name
}

/**
 * 发送消息
 * @param data 数据
 */
export async function sendMessage (data) {
    const webSocket = instances[currentName]
    if (webSocket) {
        let waitNumber = 1
        while (webSocket.readyState === 0) {
            if (waitNumber > 10) {
                throw new Error(`WebSocket初始化失败, name: ${name}`)
            }
            await new Promise(resolve => setTimeout(resolve, 300))
            waitNumber++
        }
        if (Array.isArray(data)) {
            for (let item of data) {
                item = typeof item === 'string' ? item : JSON.stringify(item)
                webSocket.send(item)
            }
        } else {
            data = typeof data === 'string' ? data : JSON.stringify(data)
            webSocket.send(data)
        }
    } else {
        throw new Error(`WebSocket未初始化, name: ${currentName}`)
    }
}

export default {
    init,
    initWithName,
    registerOnOpenHandler,
    registerOnOpenHandlerWithName,
    registerOnMessageHandler,
    registerOnMessageHandlerWithName,
    registerOnCloseHandler,
    registerOnCloseHandlerWithName,
    registerOnErrorHandler,
    registerOnErrorHandlerWithName,
    change,
    sendMessage
}
