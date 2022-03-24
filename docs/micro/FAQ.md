# 常见问题

## 页面跳转

微应用路由跳转需要使用已经封装好的方法： `/src/microApp/navTo.toPage`

```vue
<template>
    <div class="box">
        <div>阿波罗：槭树科</div>

        <el-button type="warning" @click="toBicycle">
            跨系统跳转：前往 ares 的 bicycle 页面
        </el-button>

        <el-button type="danger" @click="toBurse">
            同系统跳转：前往 apollo 的 bicycle 页面
        </el-button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Aceraceae'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { toPage } from '@/microApp/navTo'

const toBicycle = () => {
    toPage({
        path: '/ares/vehicleMage/bicycle',
        query: {
            str: 'asdf'
        }
    })
}

const toBurse = () => {
    toPage({
        path: '/apollo/botany/burseraceae',
        query: {
            str: 'qwer'
        }
    })
}
</script>

<style lang="scss" scoped>
.box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px;

    button {
        flex: none;
        width: 400px;
        margin: 0;
    }
}
</style>
```
