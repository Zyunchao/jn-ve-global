export type ListType = 'text' | 'picture' | 'picture-card'

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'

export interface ElFile extends File {
    uid: number
}

export default interface UploadFile {
    name: string
    url: string
    percentage?: number
    status?: UploadStatus
    size?: number
    response?: unknown
    uid?: number
    raw?: ElFile
    type?: string
    [k: string]: any
}
