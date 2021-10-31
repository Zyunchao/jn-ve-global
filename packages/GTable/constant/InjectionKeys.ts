import { InjectionKey, Ref } from 'vue'
import { TableConfig } from '../index'

// 根组件接收的编辑事件
export const onCellEditKey: InjectionKey<TableConfig<any>['onCellEdited']> = Symbol()

// 表格组件的实例 key
export const tableInstanceKey: InjectionKey<Ref<TableConfig<any>['instance']>> = Symbol()
