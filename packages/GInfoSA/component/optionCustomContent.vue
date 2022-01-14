<template>
    <ul :class="['option-custom-content', type]">
        <template v-for="(column, columnIndex) in columns" :key="`${column.prop}-${columnIndex}`">
            <!-- 带有 toolTip -->
            <el-tooltip
                v-if="column.showOverflowTooltip"
                effect="dark"
                :content="data[column.prop]"
                placement="top-start"
            >
                <li
                    :style="`width: ${getWidth(column.width)}; text-align: ${
                        column.align || 'left'
                    };`"
                >
                    <template v-if="column.render">
                        <FunctionalComponent :render="column.render(data, index)" />
                    </template>
                    <span v-else class="option-text">{{ data[column.prop] }}</span>
                </li>
            </el-tooltip>

            <!-- 不带 toolTip -->
            <li
                v-else
                :style="`width: ${getWidth(column.width)}; text-align: ${column.align || 'left'};`"
            >
                <template v-if="column.render">
                    <FunctionalComponent :render="column.render(data, index)" />
                </template>
                <span v-else class="option-text">{{ data[column.prop] }}</span>
            </li>
        </template>
    </ul>
</template>

<script lang="ts">
export default {
    name: 'GInfoSOrAContent'
}
</script>

<script lang="ts" setup>
import InfoColumnProps from '../interface/InfoColumnProps'
import FunctionalComponent from '../../FunctionalComponent'
import { getWidth } from '../utils'

interface Props {
    columns: InfoColumnProps[]
    data: object
    index: number
    type?: 'select' | 'autocomplete'
}

const props = withDefaults(defineProps<Props>(), {
    columns: () => [],
    data: () => ({}),
    index: 0,
    type: 'select'
})

const headerJSHieght = '34px'
</script>

<style lang="scss" scoped>
$--header-hieght: 34px;

.option-custom-content {
    display: flex;

    &.select {
        li {
            height: v-bind(headerJSHieght);

            .option-text {
                line-height: v-bind(headerJSHieght);
            }
        }
    }

    &.autocomplete {
        li {
            height: $--header-hieght;
            padding: 0;

            .option-text {
                line-height: $--header-hieght;
            }
        }
    }

    li {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>
