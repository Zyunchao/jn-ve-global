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
import Authorization from '@component/_http/Authorization'

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
    // 设定的获取数据 url，未设定就终止
    const getOptionsUrl = props.controlConfig.getOptionsUrl

    /**
     * 判断状态
     *  - 有 token
     *  - 获取选项的地址是否传递
     *  - 是否为指定的控件类型
     */
    if (
        !Authorization ||
        !getOptionsUrl ||
        ![...loadOptionsControlTyeps, ...loadTreeDataControlType].includes(props.controlConfig.type)
    ) {
        return null
    }

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
