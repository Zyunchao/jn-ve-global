import {
    BarSeriesOption,
    XAXisComponentOption,
    YAXisComponentOption
} from 'echarts/types/dist/echarts'

export default interface Bar {
    /**
     * 类型：bar
     */
    type: 'bar'
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
        | {
              [k: string]: BarSeriesOption['data']
          }

    /**
     * 标题
     */
    title?: string
    /**
     * 是否堆叠
     */
    stackX?: boolean
    /**
     * 调色板
     */
    colors?: string[]
}
