import { InjectionKey, Ref } from 'vue'
import { FormProps } from '../index'

const formConfigProvideKey: InjectionKey<Ref<FormProps>> = Symbol('formConfigProvideKey')

export default formConfigProvideKey
