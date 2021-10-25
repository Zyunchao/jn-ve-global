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
        path: '/form-test',
        component: () => import('@/views/formTest/index.vue')
    },
    {
        path: '/upload-test',
        component: () => import('@/views/formTest/uploadTest.vue')
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
    }
]

export default routes
