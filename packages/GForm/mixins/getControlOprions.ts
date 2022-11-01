import { Ref, watch } from 'vue'
import {
    FormItemProps,
    SelectControlConfig,
    CheckboxButtonControlConfig,
    RadioControlConfig,
    RadioButtonControlConfig,
    CheckboxControlConfig,
    SelectTreeV2ControlConfig
} from '../index'
import { Local } from '@jsjn/utils'

// 参数存储字段名称列表
enum DataFiledName {
    OPTIONS = 'options',
    TREE_DATA = 'treeData'
}

// 待选数据存储为 options 的控件类型列表
export const loadOptionsControlTyeps = [
    'select',
    'checkBox',
    'checkBoxButton',
    'radio',
    'radioButton'
]

// 待选数据存储为 treeData 的控件类型列表
export const loadTreeDataControlType = ['selectTreeV2']

export default ({
    props
}: {
    props: {
        formItemConfig: FormItemProps
        controlConfig:
            | SelectControlConfig
            | CheckboxControlConfig
            | CheckboxButtonControlConfig
            | RadioControlConfig
            | RadioButtonControlConfig
            | SelectTreeV2ControlConfig
        prop: Ref<string | number | boolean | object | Array<any>>
    }
}) => {
    // 范围内的组件
    if (
        ![...loadOptionsControlTyeps, ...loadTreeDataControlType].includes(props.controlConfig.type)
    ) {
        return
    }

    // 设定的获取数据 url，未设定就终止
    const getOptionsUrl = props.controlConfig.getOptionsUrl
    if (!getOptionsUrl) return null

    // 获取缓存中的 token
    const vuexCache = Local.get('vuex')
    if (!vuexCache) return null
    let Authorization = vuexCache.loginInfo['access_token']
        ? `Bearer ${vuexCache.loginInfo['access_token']}`
        : '' // 'Bearer FvnYXf0H66Tbm3ZUG6PgEGCPXHSzFZQPyOwkefeftnWw4aZYxTaqVAfi7auC'
    if (!Authorization) return

    // 通过控件类型，确定存储数据的字段名称
    const dataFieldName = loadOptionsControlTyeps.includes(props.controlConfig.type)
        ? DataFiledName.OPTIONS
        : DataFiledName.TREE_DATA

    /**
     * 监听 url 的变化
     *  - 初始化加载
     *  - url 变化加载，可能是 url 的参数变化
     */
    watch(
        () => props.controlConfig.getOptionsUrl,
        (url) => {
            /**
             * 数据请求，具有业务针对性
             */
            fetch(url, {
                method: 'get',
                headers: {
                    Authorization
                }
            })
                .then((e) => e.json())
                .then((res) => {
                    if (res.code === '000000') {
                        // 1. 自定义
                        const customMapData = props.controlConfig?.mapOptionsCb?.(res.data)
                        if (customMapData) {
                            props.controlConfig[dataFieldName] = customMapData
                            return true
                        }

                        // 2. 下拉框类（数据字段为 options 的）（默认处理行为）
                        if (dataFieldName === DataFiledName.OPTIONS) {
                            props.controlConfig[dataFieldName] = res.data.map((item) => ({
                                label: item.name,
                                value: item.id
                            }))
                            return true
                        }

                        // 3. 树类（数据名称为 treeData 的）
                        props.controlConfig[dataFieldName] = res.data
                    }
                })
                .catch((e) => {
                    console.log(
                        `%c load ${props.formItemConfig.prop} options error：`,
                        'color: #f56c6c;',
                        e
                    )
                    props.controlConfig[dataFieldName] = []
                })
        },
        {
            immediate: true
        }
    )
}
