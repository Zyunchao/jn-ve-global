export default [
    {
        text: '组件库',
        link: '/components/',
        activeMatch: '^/components/'
    },
    {
        text: '微前端',
        link: '/micro/',
        activeMatch: '^/micro/'
    },
    {
        text: 'utils',
        link: '/utilsDocs/',
        activeMatch: '^/utilsDocs/'
    },
    // {
    //     text: '前端知识分享',
    //     link: '/blog/',
    //     activeMatch: '^/blog/'
    // },
    {
        text: '更新日志',
        children: [
            {
                text: '组件库@2.2.3',
                link: '/components/UpdateLog.md'
            },
            {
                text: '基座应用@1.0.1',
                link: '/micro/updateLog/basic.md'
            },
            {
                text: '微应用框架@1.0.1',
                link: '/micro/updateLog/micro.md'
            }
        ]
    }
]
