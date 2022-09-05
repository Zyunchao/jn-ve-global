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

    const row6 = reactive<IrregularTableCell[]>([
        {
            content:'',
            ri: 5,
            ci: 0,
            colspan: 28,
            rowspan: 2
        },
        {
            content: '千',
            ri: 5,
            ci: 28,
            align: 'center'
        },
        {
            content: '百',
            ri: 5,
            ci: 29,
            align: 'center'
        },
        {
            content: '十',
            ri: 5,
            ci: 30,
            align: 'center'
        },
        {
            content: '万',
            ri: 5,
            ci: 31,
            align: 'center'
        },
        {
            content: '千',
            ri: 5,
            ci: 32,
            align: 'center'
        },
        {
            content: '百',
            ri: 5,
            ci: 33,
            align: 'center'
        },
        {
            content: '十',
            ri: 5,
            ci: 34,
            align: 'center'
        },
        {
            content: '元',
            ri: 5,
            ci: 35,
            align: 'center'
        },
        {
            content: '角',
            ri: 5,
            ci: 36,
            align: 'center'
        },
        {
            content: '分',
            ri: 5,
            ci: 37,
            align: 'center'
        }
    ])

    const row7 = reactive<IrregularTableCell[]>([
        {
            content: '',
            ri: 6,
            ci: 28,
            align: 'center'
        },
        {
            content: '1',
            ri: 6,
            ci: 29,
            align: 'center'
        },
        {
            content: '0',
            ri: 6,
            ci: 30,
            align: 'center'
        },
        {
            content: '0',
            ri: 6,
            ci: 31,
            align: 'center'
        },
        {
            content: '0',
            ri: 6,
            ci: 32,
            align: 'center'
        },
        {
            content: '0',
            ri: 6,
            ci: 33,
            align: 'center'
        },
        {
            content: '0',
            ri: 6,
            ci: 34,
            align: 'center'
        },
        {
            content: '0',
            ri: 6,
            ci: 35,
            align: 'center'
        },
        {
            content: '0',
            ri: 6,
            ci: 36,
            align: 'center'
        },
        {
            content: '0',
            ri: 6,
            ci: 37,
            align: 'center'
        }
    ])

    const efficaciousCellList = computed<IrregularTableCell[]>(() => [
        ...row1,
        ...row2,
        ...row3,
        ...row4,
        ...row5,
        ...row6,
        ...row7
    ])

    return {
        efficaciousCellList
    }
}
