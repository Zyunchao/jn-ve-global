import axios from 'axios'
import { ElMessage } from 'element-plus'
import { interceptorsReqHandle, interceptorsResHandle } from './httpInterceptors'

// 当前项目的 axios 实例
const instance = axios.create({
    timeout: 1000 * 8,
    headers: {}
})

/**
 * 请求拦截器，拦截器函数来自基座应用
 * - 请求参数处理（请求头添加）
 * - 登录鉴权处理
 */
instance.interceptors.request.use(
    async (config) => interceptorsReqHandle?.(config) ?? config,
    (error) => Promise.reject(error)
)

/**
 * 响应拦截器，拦截器函数来自基座应用
 * - 响应结果处理（数据结构处理、登录失效等）
 * - 错误处理
 */
instance.interceptors.response.use(
    async (res) => interceptorsResHandle?.(res) ?? res,
    (error) => {
        ElMessage.error(`${error}`)
        return Promise.reject(error)
    }
)

export default instance
