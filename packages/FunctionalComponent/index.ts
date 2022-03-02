import { VNode } from 'vue'

const FunctionalComponent = (
    props: {
        render: JSX.Element | VNode | string | number | Element
    },
    context
) => {
    return props.render
}

export default FunctionalComponent
