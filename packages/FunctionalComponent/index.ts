import { VNode } from 'vue'

const FunctionalComponent = (
    props: {
        render: JSX.Element | VNode
    },
    context
) => {
    return props.render
}

export default FunctionalComponent
