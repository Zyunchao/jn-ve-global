import { InjectionKey, Ref } from 'vue'
import { TableConfig } from '../index'

export const onCellEditKey: InjectionKey<TableConfig<any>['onCellEdited']> = Symbol()

export const tableInstanceKey: InjectionKey<Ref<TableConfig<any>['instance']>> = Symbol()
