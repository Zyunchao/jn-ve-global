/*
 * @Author: Zyunchao 18651805393@163.com
 * @Date: 2022-03-11 12:14:58
 * @LastEditors: Zyunchao 18651805393@163.com
 * @LastEditTime: 2022-11-29 10:46:42
 * @FilePath: /_apollo/src/microApp/httpInterceptors.ts
 * @Description: 接收父级的请求拦截函数，做到微应用与基座的行为保持一致
 */
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export type ReqHandle = (config: AxiosRequestConfig<any>) => Promise<AxiosRequestConfig<any>>
export type ResHandle = (res: AxiosResponse<any, any>) => any

export let interceptorsReqHandle: ReqHandle = null
export let interceptorsResHandle: ResHandle = null

export function setIterceptorsReqHandle(handle: ReqHandle) {
    interceptorsReqHandle = handle
}

export function setIterceptorsResHandle(handle: ResHandle) {
    interceptorsResHandle = handle
}
