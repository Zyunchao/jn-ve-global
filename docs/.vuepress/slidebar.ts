export default {
    // 组件库侧边栏
    '/components/': [
        {
            text: '指引',
            link: '/components/index.md'
        },
        {
            text: '控制组件',
            children: [
                { text: 'Form', link: '/components/Form.md' },
                { text: 'Tabs', link: '/components/Tabs.md' },
                { text: 'SelectTree', link: '/components/SelectTree.md' },
                { text: 'OperateExcel', link: '/components/OperateExcel.md' },
                { text: 'FigureInput', link: '/components/FigureInput.md' },
                { text: 'IconPicker', link: '/components/IconPicker.md' },
                { text: 'Upload', link: '/components/Upload.md' },
                { text: 'InfoSelect', link: '/components/InfoSAA/InfoSelect.md' },
                { text: 'InfoSelectAll', link: '/components/InfoSAA/InfoSelectAll.md' },
                { text: 'InfoAutocomplete', link: '/components/InfoSAA/InfoAutocomplete.md' }
            ]
        },
        {
            text: '布局组件',
            children: [
                { text: 'BaseModule', link: '/components/BaseModule.md' },
                { text: 'BaseDrawerContent', link: '/components/BaseDrawerContent.md' },
                { text: 'Modal', link: '/components/Modal.md' },
                { text: 'Collapse', link: '/components/Collapse.md' }
            ]
        },
        {
            text: '展示组件',
            children: [
                { text: 'Icon', link: '/components/Icon.md' },
                { text: 'Table', link: '/components/Table.md' },
                { text: 'Tree', link: '/components/Tree.md' }
            ]
        },
        {
            text: '基础组件',
            children: [{ text: 'DebounceButton', link: '/components/DebounceButton.md' }]
        },
        {
            text: 'ECharts',
            children: [
                {
                    text: 'Basic',
                    link: '/components/Chart/Basic.md'
                },
                {
                    text: 'Bar',
                    link: '/components/Chart/Bar.md'
                },
                {
                    text: 'Line',
                    link: '/components/Chart/Line.md'
                },
                {
                    text: 'Pie',
                    link: '/components/Chart/Pie.md'
                }
            ]
        }
    ],
    // 微前端框架
    '/micro/': [
        {
            text: '概念',
            link: '/micro/index.md'
        },
        {
            text: '微前端方案',
            link: '/micro/scheme.md'
        },
        {
            text: '优缺点对比',
            link: '/micro/practice.md'
        },
        {
            text: '落地改造',
            link: '/micro/plan.md'
        },
        {
            text: '仓库管理',
            link: '/micro/storeMage.md'
        },
        {
            text: '目录结构',
            link: '/micro/construction.md'
        }
    ]
}
