/**
 * localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const Local = {
    // 设置永久缓存
    set(key: string, val: any) {
        localStorage.setItem(key, JSON.stringify(val))
    },
    // 获取永久缓存
    get(key: string) {
        let json: any = localStorage.getItem(key)
        return JSON.parse(json)
    },
    // 移除永久缓存
    remove(key: string) {
        localStorage.removeItem(key)
    },
    // 移除全部永久缓存
    clear() {
        localStorage.clear()
    },
    // 数组 push
    push(key: string, val: any) {
        const arr = this.get(key) || []
        arr.push(val)
        this.set(key, arr)
    },
    // 数组 unshift
    unshift(key: string, val: any) {
        const arr = this.get(key) || []
        arr.unshift(val)
        this.set(key, arr)
    }
}

/**
 * sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
    // 设置临时缓存
    set(key: string, val: any) {
        sessionStorage.setItem(key, JSON.stringify(val))
    },
    // 获取临时缓存
    get(key: string) {
        let json: any = sessionStorage.getItem(key)
        return JSON.parse(json)
    },
    // 移除临时缓存
    remove(key: string) {
        sessionStorage.removeItem(key)
    },
    // 移除全部临时缓存
    clear() {
        sessionStorage.clear()
    },
    // 数组 push
    push(key: string, val: any) {
        const arr = this.get(key) || []
        arr.push(val)
        this.set(key, arr)
    },
    // 数组 unshift
    unshift(key: string, val: any) {
        const arr = this.get(key) || []
        arr.unshift(val)
        this.set(key, arr)
    }
}

/**
 * cookie
 */
export const Cookie = {
    set(name: string, value: string, days: number) {
        let d = new Date()
        d.setDate(d.getDate() + days)
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${d};`
    },
    get(name: string) {
        let arr = decodeURIComponent(document.cookie).split('; ')
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i].split('=')
            if (name === newarr[0]) {
                return newarr[1]
            }
        }
    },
    del(name: string) {
        this.set(name, '', -1)
    }
}
