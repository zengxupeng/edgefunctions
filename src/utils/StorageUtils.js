/**
 * 根据键获取值
 * @param key 键
 * @returns {any|null}
 */
export function get (key) {
    if (!key) {
        return null
    }
    const value = sessionStorage.getItem(key) || localStorage.getItem(key)
    return JSON.parse(value)
}

/**
 * 在会话存储中根据键获取值
 * @param key 键
 * @returns {any|null}
 */
export function sessionGet (key) {
    if (!key) {
        return null
    }
    return JSON.parse(sessionStorage.getItem(key))
}

/**
 * 在本地存储中根据键获取值
 * @param key 键
 * @returns {any|null}
 */
export function localGet (key) {
    if (!key) {
        return null
    }
    return JSON.parse(localStorage.getItem(key))
}

/**
 * 在会话存储中设置键值
 * @param key 键
 * @param value 值
 * @returns {null}
 */
export function sessionSet (key, value) {
    if (!key) {
        return null
    }
    if (value === undefined) {
        value = null
    }
    sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * 在本地存储中设置键值
 * @param key 键
 * @param value 值
 * @returns {null}
 */
export function localSet (key, value) {
    if (!key) {
        return null
    }
    if (value === undefined) {
        value = null
    }
    localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 在会话存储中删除键
 * @param key 键
 * @returns {any}
 */
export function sessionDelete (key) {
    if (!key) {
        return
    }
    const value = sessionStorage.getItem(key)
    if (value) {
        sessionStorage.removeItem(key)
    }
    return JSON.parse(value)
}

/**
 * 在本地存储中删除键
 * @param key 键
 * @returns {any}
 */
export function localDelete (key) {
    if (!key) {
        return
    }
    const value = localStorage.getItem(key)
    if (value) {
        localStorage.removeItem(key)
    }
    return JSON.parse(value)
}

export default {
    get,
    sessionGet,
    localGet,
    sessionSet,
    localSet,
    sessionDelete,
    localDelete
}
