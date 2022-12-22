import { InjectionKey, ComputedRef } from 'vue'

export default Symbol('collapse-item-disabled-key') as InjectionKey<ComputedRef<boolean>>
