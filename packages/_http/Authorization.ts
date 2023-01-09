/*
 * @Author: Zyunchao 18651805393@163.com
 * @Date: 2023-01-09 13:41:30
 * @LastEditors: Zyunchao 18651805393@163.com
 * @LastEditTime: 2023-01-09 14:17:38
 * @FilePath: /jn-ve-global/packages/_http/Authorization.ts
 * @Description: 获取 localStorage 中的登录缓存（来自于业务框架的 vuex 持久化数据）
 *
 * 本身组件库的出发点应该是与业务框架解耦的（不与业务关联，任何业务框架都可以使用组件库，通用性）
 * 但是某些情况下可能会要请求业务端的数据，要发送接口，就需要登录 token
 * 这里统一获取缓存中的 token 使用
 *
 */
import { Local } from '@jsjn/utils'

const vuexCache = Local.get('vuex')

const mockToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJleUpqYkdsbGJuUkpaQ0k2SWprNU9Ua2lMQ0oxYzJWeVNXUWlPaUl4TmpBeU5EZzVNelE0TWpnNE5qZzRNVEk1SW4wPSIsInJuU3RyIjoiSFNJdEFDd2FrYzJUV3Z2dHpMVld1RWdaMGZBcFIxRUgifQ.LUlCOjp7sa5WJTF2cuWJjkKg5zbvLE4q0kh4hPFNjpI'

let Authorization = vuexCache?.loginInfo?.access_token
    ? `Bearer ${vuexCache.loginInfo.access_token}`
    : mockToken

export default Authorization
