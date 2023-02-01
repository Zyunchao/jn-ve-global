/*
 * @Author: Zyunchao 18651805393@163.com
 * @Date: 2023-02-01 10:02:50
 * @LastEditors: Zyunchao 18651805393@163.com
 * @LastEditTime: 2023-02-01 10:20:49
 * @FilePath: /jn-ve-global/packages/GTable/component/TableEditCell/hooks/useAddValidate.ts
 * @Description: 针对当前单元格，在创建完成后，创建 validator 实例
 */
import { watch, onMounted, ref } from 'vue'
import Schema, { ValidateError } from 'async-validator'

export default ({ editCellContentRef, props, localPropRef, localData }) => {
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

            currentCellValidator.value = validator

            // 监听数据改变，执行校验
            watch(
                () => localPropRef.value,
                (val) => {
                    validator
                        .validate(localData.value)
                        .then((res) => {
                            validateRes.value = true
                            validateMsg.value = ''
                        })
                        .catch((errProps: { errors: ValidateError[] }) => {
                            validateRes.value = false

                            const msg: string = errProps.errors.find((item) => {
                                return item.field === props.columnConfig.prop
                            })?.message
                            validateMsg.value = msg
                        })
                }
            )
        }
    })

    return {
        currentCellValidator,
        validateRes,
        validateMsg
    }
}
