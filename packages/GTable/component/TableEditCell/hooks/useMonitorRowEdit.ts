/*
 * @Author: Zyunchao 18651805393@163.com
 * @Date: 2023-02-01 10:02:50
 * @LastEditors: Zyunchao 18651805393@163.com
 * @LastEditTime: 2023-02-01 10:24:46
 * @FilePath: /jn-ve-global/packages/GTable/component/TableEditCell/hooks/useMonitorRowEdit.ts
 * @Description: 监视器，监听行 edit 状态发生改变
 */
import { watch } from 'vue'
import _ from 'lodash'
import { ValidateError } from 'async-validator'

export default ({
    localData,
    text2Control,
    currentCellValidator,
    cellStatus,
    CellStatus,
    localPropCopy,
    localPropRef,
    validateRes,
    validateMsg,
    props
}) => {
    watch(
        () => localData.value.edit,
        (edit) => {
            if (edit) {
                text2Control()
            } else {
                /**
                 * 隐藏的单元格、没有 rules 的单元格直接放行
                 * 1. 将状态切换回 Text
                 * 2. 备份最新的数据
                 */
                if (currentCellValidator.value === null) {
                    cellStatus.value = CellStatus.TEXT
                    localPropCopy.value = _.cloneDeep(localPropRef.value)
                    return
                }

                /**
                 * 有 rules，且不为隐藏
                 * 主动触发校验
                 */
                currentCellValidator.value
                    .validate(localData.value)
                    .then((res) => {
                        validateRes.value = true
                        validateMsg.value = ''

                        // 校验成功，切换状态，并备份最新的编辑结果
                        cellStatus.value = CellStatus.TEXT
                        localPropCopy.value = _.cloneDeep(localPropRef.value)
                    })
                    .catch((errProps: { errors: ValidateError[] }) => {
                        validateRes.value = false

                        // 校验失败，阻止关闭编辑状态
                        localData.value.edit = true

                        const msg: string = errProps.errors.find((item) => {
                            return item.field === props.columnConfig.prop
                        })?.message
                        validateMsg.value = msg
                    })
            }
        }
    )
}
