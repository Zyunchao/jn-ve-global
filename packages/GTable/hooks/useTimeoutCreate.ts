import { ref, onMounted } from 'vue'

export default () => {
    const isCreate = ref<boolean>(false)

    setTimeout(() => {
        isCreate.value = true
    }, 0)

    return {
        isCreate
    }
}
