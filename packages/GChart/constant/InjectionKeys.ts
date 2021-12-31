import { InjectionKey, Ref } from 'vue'
import ChartConfig from '../interface/ChartConfig'

// 根组件接收的编辑事件
export const chartConfigKey: InjectionKey<ChartConfig> = Symbol()
