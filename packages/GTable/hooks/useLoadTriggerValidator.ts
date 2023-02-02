/*
 * @Author: Zyunchao 18651805393@163.com
 * @Date: 2023-02-01 11:40:38
 * @LastEditors: Zyunchao 18651805393@163.com
 * @LastEditTime: 2023-02-02 10:51:06
 * @FilePath: /jn-ve-global/packages/GTable/hooks/useLoadTriggerValidator.ts
 * @Description: 为表格（可编辑）添加主动校验方法
 */
import { Ref, watch, nextTick, computed, ref, reactive, toRaw, provide, readonly } from 'vue'
import { allEditCellValidatorMapKey, rowFlagKey } from '../constant/allEditCellValidator'
import type { AllEditCellValidatorMap, CellValidator } from '../constant/allEditCellValidator'
import type { TableConfig } from '../index'
import Schema, { ValidateError } from 'async-validator'

interface Props {
    props: {
        config: TableConfig
    }
    localInstance: Ref<TableConfig['instance']>
}

export default (props: Props) => {
    const allEditCellValidatorMap: AllEditCellValidatorMap = reactive({})

    // 存储所有编辑单元格的校验器
    provide(allEditCellValidatorMapKey, allEditCellValidatorMap)

    /**
     * 抛出 validate 方法
     */
    watch(
        () => props.props.config.instance,
        (instance) => {
            if (!instance) return
            instance.validate = (params = {}) => {
                const { ri, prop } = params

                // 有效的校验器
                const effectiveCellValidator: CellValidator[] = findEffectiveCellValidator(
                    allEditCellValidatorMap,
                    ri,
                    prop
                )

                /**
                 * 基于传递的参数，获取到的有效的校验器列表
                 */
                if (effectiveCellValidator.length) {
                    const allValidateRes = effectiveCellValidator.map((cellValidator) =>
                        cellValidator.schema
                            .validate(cellValidator.rowData)
                            .then((res) => {
                                cellValidator.successful()
                                return res
                            })
                            .catch((errProps: { errors: ValidateError[] }) => {
                                cellValidator.unsuccessful(errProps)
                                return Promise.reject(errProps.errors)
                            })
                    )

                    /**
                     * 将所有的有效校验器的结果收集起来，统一返回 Promise
                     */
                    return Promise.allSettled(allValidateRes).then((res) => {
                        if (res.some((item) => item.status === 'rejected')) {
                            return Promise.reject(res.filter((item) => item.status === 'rejected'))
                        }
                        return Promise.resolve(res)
                    })
                }

                return Promise.resolve([])
            }
        }
    )
}

/**
 * 根据传递的条件，全局查找有效的单元格校验器
 * @param map 表格内所有可编辑单元格的校验器对象集合
 * @param ri 行索引
 * @param prop 列标志
 * @returns 所有有效的单元格校验器
 */
function findEffectiveCellValidator(
    map: AllEditCellValidatorMap,
    ri?: number,
    prop?: string
): CellValidator[] {
    const temp: CellValidator[] = []

    Object.keys(map).forEach((rowKey) => {
        const row = map[rowKey]
        Object.keys(row).forEach((cellValidatorKey) => {
            const cellValidator = row[cellValidatorKey]
            if (!cellValidator || !cellValidator.schema || !cellValidator.controlCellShow) {
                return
            }

            if (!ri && !prop) {
                // 全部校验
                temp.push(cellValidator)
            } else if (!ri && prop) {
                // 按列校验
                if (prop === cellValidatorKey) {
                    temp.push(cellValidator)
                }
            } else if (ri && !prop) {
                // 按行校验
                if (rowKey === `${rowFlagKey}${ri}`) {
                    temp.push(cellValidator)
                }
            } else if (ri && prop) {
                // 具体单元格校验
                if (rowKey === `${rowFlagKey}${ri}` && prop === cellValidatorKey) {
                    temp.push(cellValidator)
                }
            }
        })
    })

    return temp
}
