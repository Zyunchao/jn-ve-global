import { RouteConfig } from '@/@types/Route'

const routes: Array<RouteConfig> = [
    {
        path: '/table-test',
        component: () => import('@/views/tableTest/index.vue')
    },
    {
        path: '/edit-table-test',
        component: () => import('@/views/tableTest/editDemo.vue')
    },
    {
        path: '/selection-table-test',
        component: () => import('@/views/tableTest/selectionDemo.vue')
    },
    {
        path: '/baseModule-test',
        component: () => import('@/views/baseModuleTest/index.vue')
    },
    {
        path: '/baseModule-selection-test',
        component: () => import('@/views/baseModuleTest/selectionDemo.vue')
    },
    {
        path: '/disToolTip-test',
        component: () => import('@/views/formTest/disToolTip.vue')
    },
    {
        path: '/form-test',
        component: () => import('@/views/formTest/index.vue')
    },
    {
        path: '/selectTree-test',
        component: () => import('@/views/selectTreeTest/index.vue')
    },
    {
        path: '/icon-test',
        component: () => import('@/views/iconTest/index.vue')
    },
    {
        path: '/tree-test',
        component: () => import('@/views/treeTest/index.vue')
    },
    {
        path: '/importExcel-test',
        component: () => import('@/views/importExcelTest/index.vue')
    },
    {
        path: '/upload-test',
        component: () => import('@/views/uploadTest/index.vue')
    },
    {
        path: '/baseDrawerContentTest-test',
        component: () => import('@/views/baseDrawerContentTest/index.vue')
    },
    {
        path: '/hide-table-test',
        component: () => import('@/views/tableTest/hideDemo.vue')
    },
    {
        path: '/modal-test',
        component: () => import('@/views/modalTest/index.vue')
    },
    {
        path: '/figureInput-test',
        component: () => import('@/views/formTest/figureInput.vue')
    },
    {
        path: '/controlGroup-test',
        component: () => import('@/views/formTest/controlGroup.vue')
    },
    {
        path: '/fileList-test',
        component: () => import('@/views/uploadTest/fileList.vue')
    },
    {
        path: '/collapse-test',
        component: () => import('@/views/collapseTest/index.vue')
    },
    {
        path: '/chart-test',
        component: () => import('@/views/chartTest/index.vue')
    },
    {
        path: '/infoSelect-test',
        component: () => import('@/views/infoSAA/infoSelectTest/index.vue')
    },
    {
        path: '/infoSelectAll-test',
        component: () => import('@/views/infoSAA/infoSelectAllTest/index.vue')
    },
    {
        path: '/infoAutocomplete-test',
        component: () => import('@/views/infoSAA/infoAutocompleteTest/index.vue')
    }
]

export default routes
