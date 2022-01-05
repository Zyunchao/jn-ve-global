import { PieSeriesOption } from 'echarts/types/dist/echarts'
import BaseConfig from './BaseConfig'

export default interface PieConfig extends BaseConfig {
    /**
     * 类型：饼图
     */
    type: 'pie'
    /**
     * 饼图数据
     */
    data?: PieSeriesOption['data']
}
