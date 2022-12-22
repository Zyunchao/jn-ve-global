import { computed, useAttrs } from 'vue'
import type { FormItemProps } from '../../index'
import { RefreshLeft, Search } from '@element-plus/icons-vue'

export default ({ props, emits, tableSearchRef }) => {
    const attrs = useAttrs()

    const searchBtnsConfig = computed<FormItemProps>(() => ({
        prop: 'opertion-btn',
        class: `content-center search-btn-item`,
        span:
            props.searchBtnHorizontal || !!props.moreSearchMode
                ? 24
                : props.searchFormProps.formItems[props.searchFormProps.formItems.length - 1]
                    ?.span || 24,
        render() {
            return (
                <>
                    <el-button
                        icon={RefreshLeft}
                        onClick={() => {
                            // 优先执行用户传递的 reset
                            if (attrs.onReset && typeof attrs.onReset === 'function') {
                                attrs.onReset()
                                return
                            }

                            // 清空查询条件
                            props.searchFormProps.instance?.resetFields()

                            // 清空多选
                            emits('update:selectedRows', [])

                            if (!props.loadTableMethods)
                                throw new Error('core load-table-methods 未找到')
                            props.loadTableMethods?.(1)
                        }}>
                        重置
                    </el-button>
                    {props.searchBtnAuthCode ? (
                        <el-button
                            v-auth={props.searchBtnAuthCode}
                            type='primary'
                            icon={Search}
                            onClick={() => {
                                _searchHandle()
                            }}>
                            查询
                        </el-button>
                    ) : (
                        <el-button
                            type='primary'
                            icon={Search}
                            onClick={() => {
                                _searchHandle()
                            }}>
                            查询
                        </el-button>
                    )}
                </>
            )
        }
    }))

    // 增强函数
    async function _searchHandle() {
        // 校验
        const validateRes = await props.searchFormProps.instance.validate()

        // 更多查询条件时，查询关闭弹框
        if (props.moreSearchMode === 'popup' && tableSearchRef.value.popupShow) {
            tableSearchRef.value.closePopup()
        }

        // 优先执行用户传递的 search
        if (attrs.onSearch && typeof attrs.onSearch === 'function') {
            attrs.onSearch()
            return
        }

        if (!props.loadTableMethods) throw new Error('core load-table-methods 未找到')
        props.loadTableMethods?.(1)
    }

    return {
        searchBtnsConfig
    }
}
