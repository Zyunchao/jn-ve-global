import { TableConfig, TableRowBtnProps, BaseTableDataItem } from '../../../index'
import More from './component/more.vue'
import { getBtnProps } from './constant/util'

/**
 * 对数据进行 push 操作，会改变原始数据
 * 也必须对源数据进行操作，才能映射到组件上
 */
export default (config: TableConfig<any>) => {
    /**
     * 追加操作列的条件
     *  1. 有 columns
     *  2. columns 长度不为 0
     *  3. 不包含 操作列
     *  4. 传递了 rowBtnConfig
     *  5. rowBtnConfig 包含 btns 配置
     *  6. btns 长度不为 0
     */
    if (
        !!config.columns &&
        !!config.columns.length &&
        !config.columns.some((column) => column.prop === 'opertion' || column.label === '操作') &&
        !!config.rowBtnConfig &&
        !!config.rowBtnConfig.btns &&
        !!config.rowBtnConfig.btns.length
    ) {
        const columns = config.columns
        const rowBtnConfig = config.rowBtnConfig
        const btns = rowBtnConfig.btns
        const maxCount = rowBtnConfig.maxCount
        const showMore = !!maxCount && maxCount < rowBtnConfig.btns.length

        columns.push({
            prop: 'opertion',
            label: '操作',
            width: rowBtnConfig.width || 200,
            fixed: 'right',
            align: rowBtnConfig.align || 'left',
            hide: rowBtnConfig.hide,
            render: (row, index) => {
                // 正常展示
                if (!showMore) {
                    return (
                        <>
                            {btns
                                .filter((btn) => !hiddenBtn(btn.hide, row, index))
                                .map((btn) => {
                                    return createBtn(btn, row, index)
                                })}
                        </>
                    )
                }

                // 更多展示
                return (
                    <>
                        {btns
                            .filter((btn) => !hiddenBtn(btn.hide, row, index))
                            .filter((_, index) => index < maxCount)
                            .map((btn) => createBtn(btn, row, index))}

                        {/*  更多操作 */}
                        <More
                            row={row}
                            index={index}
                            btns={btns
                                .filter((btn) => !hiddenBtn(btn.hide, row, index))
                                .filter((_, index) => index >= maxCount)}
                        />
                    </>
                )
            }
        })
    }
}

/**
 * 创建按钮
 * @param btn 按钮配置
 * @param row 行
 * @param index 行的 index
 * @returns 按钮 JSX.Element
 */
function createBtn(btn: TableRowBtnProps<any>, row: BaseTableDataItem, index: number) {
    const btnSourceProps = getBtnProps(btn)
    let disabled = typeof btn.disabled === 'function' ? btn.disabled(row, index) : btn.disabled

    /**
     * 需要鉴权 or 不需要鉴权的按钮
     */
    return btn.authCode ? (
        <el-button
            {...btnSourceProps}
            disabled={disabled}
            type='text'
            v-auth={btn.authCode}
            onClick={() => {
                btn.onClick?.(row, index)
            }}>
            {btn.label}
        </el-button>
    ) : (
        <el-button
            {...btnSourceProps}
            disabled={disabled}
            type='text'
            onClick={() => {
                btn.onClick?.(row, index)
            }}>
            {btn.label}
        </el-button>
    )
}

/**
 * 获取按钮的隐藏状态
 * @param btnHide 状态
 * @param row 当前行
 * @param index 当前行 index
 * @returns 状态值 boolean
 */
function hiddenBtn(btnHide: TableRowBtnProps<any>['hide'], row: BaseTableDataItem, index: number) {
    // 简单的布尔值
    if (typeof btnHide === 'boolean') return btnHide

    // 函数
    if (typeof btnHide === 'function') return btnHide(row, index)

    // 未填 undefined（不控制显隐）
    return false
}
