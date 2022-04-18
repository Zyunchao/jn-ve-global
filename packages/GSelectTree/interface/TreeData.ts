export interface TreeData {
    id: number | string
    name: string
    children: TreeData[]
    value?: string
    label?: string
    [k: string]: unknown
}
