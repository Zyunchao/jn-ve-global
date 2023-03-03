import { ref } from 'vue'

export default () => {
    const filterTextLeft = ref<string>('')
    const filterTextRight = ref<string>('')

    return {
        filterTextLeft,
        filterTextRight
    }
}
