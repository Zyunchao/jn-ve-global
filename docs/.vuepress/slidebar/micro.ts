export default [
    {
        text: '微前端',
        children: [
            {
                text: '概念',
                link: '/micro/index.md'
            },
            {
                text: '可用方案',
                link: '/micro/scheme.md'
            },
            {
                text: '优缺点对比',
                link: '/micro/practice.md'
            },
            {
                text: '落地改造',
                link: '/micro/plan.md'
            }
        ]
    },
    {
        text: '仓库管理',
        link: '/micro/storeMage.md'
    },
    {
        text: '快速开始',
        link: '/micro/quickStart.md'
    },
    {
        text: '目录结构',
        link: '/micro/construction.md'
    },
    {
        text: '环境变量',
        link: '/micro/environmentVar.md'
    },
    {
        text: '模块详解',
        children: [
            {
                text: '索引',
                link: '/micro/moduleDetail/indexes.md'
            },
            {
                text: '系统类型',
                collapsible: true,
                children: [
                    {
                        text: '概念',
                        link: '/micro/moduleDetail/typesConcept.md'
                    },
                    {
                        text: '实体类使用',
                        link: '/micro/moduleDetail/typesPractical.md'
                    }
                ]
            },
            {
                text: '资源',
                link: '/micro/moduleDetail/assets.md'
            },
            {
                text: '路由',
                collapsible: true,
                children: [
                    {
                        text: '概念',
                        link: '/micro/moduleDetail/routerConcept.md'
                    },
                    {
                        text: '实用',
                        link: '/micro/moduleDetail/routerPractical.md'
                    }
                ]
            },
            {
                text: '全局状态管理',
                collapsible: true,
                children: [
                    {
                        text: '概念',
                        link: '/micro/moduleDetail/storeConcept.md'
                    },
                    {
                        text: '实用',
                        link: '/micro/moduleDetail/storePractical.md'
                    }
                ]
            },
            {
                text: '请求',
                collapsible: true,
                children: [
                    {
                        text: '概念',
                        link: '/micro/moduleDetail/requestConcept.md'
                    },
                    {
                        text: '实用',
                        link: '/micro/moduleDetail/requestPractical.md'
                    }
                ]
            },
            {
                text: '页面',
                link: '/micro/moduleDetail/pages.md'
            },
            {
                text: '组件',
                link: '/micro/moduleDetail/component.md'
            }
        ]
    },
    {
        text: '生产&发布',
        link: '/micro/production.md'
    }
]
