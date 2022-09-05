import { reactive, computed } from 'vue'
import type { IrregularTableCell } from '@component/index'

export default () => {
    const row1 = reactive<IrregularTableCell[]>([
        {
            content: '机 构',
            ri: 0,
            ci: 0,
            rowspan: 2,
            colspan: 3,
            align: 'center'
        },
        {
            content: '名 称',
            ri: 0,
            ci: 3,
            colspan: 4,
            align: 'center'
        },
        {
            content: '',
            ri: 0,
            ci: 7,
            colspan: 14
        },
        {
            content: '电 话',
            ri: 0,
            ci: 21,
            colspan: 7,
            align: 'center'
        },
        {
            content: '',
            ri: 0,
            ci: 28,
            colspan: 10
        }
    ])
    const row2 = reactive<IrregularTableCell[]>([
        {
            content: '地 址',
            ri: 1,
            ci: 3,
            colspan: 4,
            align: 'center'
        },
        {
            content: '',
            ri: 1,
            ci: 7,
            colspan: 14
        },
        {
            content: '许可证编号',
            ri: 1,
            ci: 21,
            colspan: 7,
            align: 'center'
        },
        {
            content: '',
            ri: 1,
            ci: 28,
            colspan: 10
        }
    ])
    const row3 = reactive<IrregularTableCell[]>([
        {
            content: '用 户',
            ri: 2,
            ci: 0,
            rowspan: 3,
            colspan: 3,
            align: 'center'
        },
        {
            content: '名 称',
            ri: 2,
            ci: 3,
            colspan: 4,
            align: 'center'
        },
        {
            content: '',
            ri: 2,
            ci: 7,
            colspan: 14
        },
        {
            content: '电 话',
            ri: 2,
            ci: 21,
            colspan: 7,
            align: 'center'
        },
        {
            content: '',
            ri: 2,
            ci: 28,
            colspan: 10
        }
    ])
    const row4 = reactive<IrregularTableCell[]>([
        {
            content: '地 址',
            ri: 3,
            ci: 3,
            colspan: 4,
            align: 'center'
        },
        {
            content: '',
            ri: 3,
            ci: 7,
            colspan: 14
        },
        {
            content: '联系人',
            ri: 3,
            ci: 21,
            colspan: 7,
            align: 'center'
        },
        {
            content: '',
            ri: 3,
            ci: 28,
            colspan: 10
        }
    ])
    const row5 = reactive<IrregularTableCell[]>([
        {
            content: '证件名称',
            ri: 4,
            ci: 3,
            colspan: 4,
            align: 'center'
        },
        {
            content: '',
            ri: 4,
            ci: 7,
            colspan: 14
        },
        {
            content: '证件号码',
            ri: 4,
            ci: 21,
            colspan: 7,
            align: 'center'
        },
        {
            content: '',
            ri: 4,
            ci: 28,
            colspan: 10
        }
    ])
    const efficaciousCellList = computed<IrregularTableCell[]>(() => [
        ...row1,
        ...row2,
        ...row3,
        ...row4,
        ...row5
    ])

    return {
        row1,
        row2,
        row3,
        row4,
        row5,
        efficaciousCellList
    }
}
