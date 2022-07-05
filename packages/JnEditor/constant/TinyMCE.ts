import { TinyMCE } from '../interface/tinymce'

const getGlobal = (): any => (!window['rawWindow'] ? window : window['rawWindow'])

const getTinymce = (): TinyMCE => {
    const global = getGlobal()
    return global && global.tinymce ? global.tinymce : null
}

export { getTinymce }
