/*
 * @Author: Zyunchao 18651805393@163.com
 * @Date: 2023-01-09 14:32:31
 * @LastEditors: Zyunchao 18651805393@163.com
 * @LastEditTime: 2023-01-09 14:52:31
 * @FilePath: /jn-ve-global/examples/mock/mockStore.ts
 * @Description: 模拟业务框架的 vuex 持久化的数据
 */
import { Local } from '@jsjn/utils'
import mockVuex from './data/vuex.json'

const mockToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJleUpqYkdsbGJuUkpaQ0k2SWprNU9Ua2lMQ0oxYzJWeVNXUWlPaUl4TmpBeU5EZzVNelE0TWpnNE5qZzRNVEk1SW4wPSIsInJuU3RyIjoiSFNJdEFDd2FrYzJUV3Z2dHpMVld1RWdaMGZBcFIxRUgifQ.LUlCOjp7sa5WJTF2cuWJjkKg5zbvLE4q0kh4hPFNjpI'

mockVuex.loginInfo.access_token = mockToken

Local.set('vuex', mockVuex)
