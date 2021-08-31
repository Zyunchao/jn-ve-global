export interface TreeData {
    id: number | string
    name: string
    children: TreeData[]
    [k: string]: unknown
}
