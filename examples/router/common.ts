import { RouteRecordRaw } from 'vue-router'
import BusinessRoutes from './modules'

console.log(`%c BusinessRoutes == `, 'color: #e6a23c;', BusinessRoutes)

const commonRoutes: Array<RouteRecordRaw> = [
    ...BusinessRoutes,
    {
        path: '/',
        redirect: '/table-test'
    },
    {
        path: '/:path(.*)*',
        component: () => import('@/views/error/404.vue')
    },
    {
        path: '/500',
        component: () => import('@/views/error/500.vue')
    }
]

export default commonRoutes
