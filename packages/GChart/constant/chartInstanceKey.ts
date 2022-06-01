import { InjectionKey, Ref } from 'vue'
import { ECharts } from 'echarts'

export const chartInstanceKey: InjectionKey<Ref<ECharts>> = Symbol('chartInstanceKey')
