/*
 * @Author: Zyunchao 18651805393@163.com
 * @Date: 2023-02-01 10:02:50
 * @LastEditors: Zyunchao 18651805393@163.com
 * @LastEditTime: 2023-02-02 10:53:04
 * @FilePath: /jn-ve-global/packages/GTable/component/TableEditCell/hooks/useAddValidate.ts
 * @Description: 针对当前单元格，在创建完成后，创建 validator 实例
 */
import { watch, onMounted, ref, inject, nextTick, onUnmounted } from 'vue'
import Schema, { ValidateError } from 'async-validator'
import { rowFlagKey, allEditCellValidatorMapKey } from '../../../constant/allEditCellValidator'

export default ({ editCellContentRef, props, localPropRef, localData, controlCellShow }) => {
    const rowKey = `${rowFlagKey}${props.index}`
    const cellName = props.columnConfig.prop
    const allEditCellValidatorMap = inject(allEditCellValidatorMapKey)

    /**
     * 校验结果
     *  成功：正常流程
     *  失败：组织一切关闭控件的操作
     */
    const validateRes = ref<boolean>(true)
    const currentCellValidator = ref<Schema>(null)
    const validateMsg = ref<string>('')

    onMounted(() => {
        if (!editCellContentRef.value) return

        // 添加校验器
        if (props.columnConfig.rules) {
            const descriptor = {
                [props.columnConfig.prop]: props.columnConfig.rules
            }

            // 检验器
            let validator: Schema = new Schema(descriptor)

            // 本地抛出
            currentCellValidator.value = validator

            /**
             * 全局按 key 搜集存储，供表格总的校验方法
             */
            nextTick(() => {
                allEditCellValidatorMap[rowKey] = allEditCellValidatorMap[rowKey] ?? {}
                allEditCellValidatorMap[rowKey][cellName] = {
                    value: localPropRef,
                    schema: validator,
                    rules: props.columnConfig.rules,
                    controlCellShow,
                    successful,
                    unsuccessful,
                    rowData: localData,
                    __ri__: props.index,
                    __prop__: props.columnConfig.prop
                }
            })

            // 监听数据改变，执行校验
            watch(
                () => localPropRef.value,
                (val) => {
                    validator.validate(localData.value).then(successful).catch(unsuccessful)
                }
            )

            function successful() {
                validateRes.value = true
                validateMsg.value = ''
            }
            function unsuccessful(errProps: { errors: ValidateError[] }) {
                validateRes.value = false

                const msg: string = errProps.errors.find((item) => {
                    return item.field === props.columnConfig.prop
                })?.message
                validateMsg.value = msg
            }
        }
    })

    // 单元格销毁时，移除全局保存的当前单元格校验器
    onUnmounted(() => {
        allEditCellValidatorMap[rowKey][cellName] = null
    })

    return {
        currentCellValidator,
        validateRes,
        validateMsg
    }
}
