import Schema, { ValidateError } from 'async-validator'
import { InjectionKey, Ref } from 'vue'
import { Rule } from 'async-validator'

export interface CellValidator {
    /**
     * 值
     */
    value: Ref<any>
    /**
     * 校验器
     */
    schema: Schema
    /**
     * 成功回调
     */
    successful: (res?: any) => void
    /**
     * 失败回调
     */
    unsuccessful: (errProps: { errors: ValidateError[] }) => void
    /**
     * 校验规则
     */
    rules: Rule
    /**
     * 单元格是否处于编辑状态
     */
    controlCellShow: Ref<boolean>
    /**
     * 所在行的数据
     */
    rowData: Ref<any>
    /**
     * 所在行的索引
     */
    __ri__: number
    /**
     * 列的标志
     */
    __prop__: string
}

export interface AllEditCellValidatorMap {
    /**
     * 行
     */
    [key: string]: {
        /**
         * 列
         */
        [key: string]: CellValidator
    }
}

export const rowFlagKey = 'row_'

export const allEditCellValidatorMapKey = Symbol(
    'allEditCellValidatorMap'
) as InjectionKey<AllEditCellValidatorMap>
