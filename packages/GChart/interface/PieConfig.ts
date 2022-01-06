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
    /**
     * 饼图的半径
     */
    radius?: PieSeriesOption['radius']
    /**
     * label 的位置
     * 'outside' 饼图扇区外侧，通过视觉引导线连到相应的扇区。
     * 'inside' 饼图扇区内部。
     * 'inner' 同 'inside'。
     * 'center' 在饼图中心位置。见圆环图示例
     */
    labelPosition?: 'outside' | 'inside' | 'inner' | 'center'
    /**
     * 是否显示饼 item 的边框
     */
    showBorder?: boolean
}
