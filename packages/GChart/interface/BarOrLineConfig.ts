import {
    BarSeriesOption,
    LineSeriesOption,
    XAXisComponentOption,
    YAXisComponentOption
} from 'echarts/types/dist/echarts'
import BaseConfig from './BaseConfig'

export default interface BarOrLineConfig extends BaseConfig {
    /**
     * 类型：bar
     */
    type: 'bar' | 'line' | Array<'bar' | 'line'>
    /**
     * xAxis
     */
    x:
        | Array<string | number | Date>
        | {
              [k: string]: XAXisComponentOption
          }
    /**
     * yAxis
     */
    y?:
        | Array<string | number | Date>
        | {
              [k: string]: YAXisComponentOption
          }
    /**
     * series & data
     * data 可以是简单类型数组，也可以是单独配置的数据对象
     */
    data:
        | BarSeriesOption['data']
        | LineSeriesOption['data']
        | {
              [k: string]: BarSeriesOption['data'] | LineSeriesOption['data']
          }
    /**
     * 是否堆叠
     */
    stackX?: boolean
    /**
     * 是否显示区域面积图
     */
    showLineArea?: boolean
    /**
     * 是否平滑曲线显示
     */
    lineSmooth?: boolean
}
