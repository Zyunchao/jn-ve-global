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
        text: '微应用注册列表',
        link: '/micro/microRegList.md'
    },
    {
        text: '快速开始',
        children: [
            {
                text: '基于本地基座应用开发',
                link: '/micro/quickStart.md'
            },
            {
                text: '基于部署生产的基座应用开发',
                link: '/micro/quickStart2.md'
            }
        ]
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
                        text: 'api',
                        link: '/micro/moduleDetail/requestApi.md'
                    },
                    {
                        text: '实用',
                        link: '/micro/moduleDetail/requestPractical.md'
                    },
                    {
                        text: '代理配置',
                        link: '/micro/moduleDetail/requestProxy.md'
                    }
                ]
            },
            {
                text: '页面',
                link: '/micro/moduleDetail/pages.md'
            },
            {
                text: '组件',
                collapsible: true,
                children: [
                    {
                        text: '概念',
                        link: '/micro/moduleDetail/componentConcept.md'
                    },
                    {
                        text: '实用',
                        link: '/micro/moduleDetail/componentPractical.md'
                    }
                ]
            },
            {
                text: '指令',
                link: '/micro/moduleDetail/directives.md'
            }
        ]
    },
    {
        text: '主题',
        link: '/micro/theme.md'
    },
    {
        text: '首页开发',
        link: '/micro/homeDev.md'
    },
    {
        text: '流程平台',
        link: '/micro/workflow.md'
    },
    {
        text: '生产&发布',
        link: '/micro/production.md'
    },
    {
        text: '常见问题',
        children: [
            {
                text: '页面跳转',
                link: '/micro/FAQ.md#页面跳转'
            },
            {
                text: '内嵌 iframe',
                link: '/micro/FAQ.md#内嵌-iframe-主动激活-帆软报表'
            }
        ]
    }
    // {
    //     text: 'Issue',
    //     link: '/micro/issue/disableScopecss.md'
    // }
]
