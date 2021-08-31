import { RouteConfig } from '@/@types/Route'

const routes: Array<RouteConfig> = [
    {
        path: '/table-test',
        component: () => import('@/views/tableTest/index.vue')
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
        path: '/selectTree-test',
        component: () => import('@/views/selectTreeTest/index.vue')
    },
    {
        path: '/icon-test',
        component: () => import('@/views/iconTest/index.vue')
    }
]

export default routes
