export interface TreeData {
    id: number | string
    name: string
    children: TreeData[]
    value?: string
    label?: string
    disabled?: boolean
    checked?: boolean
    [k: string]: any
}
