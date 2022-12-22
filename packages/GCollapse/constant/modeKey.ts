import { InjectionKey, ComputedRef } from 'vue'

export default Symbol('collapse-item-key') as InjectionKey<ComputedRef<'card' | 'panel'>>
