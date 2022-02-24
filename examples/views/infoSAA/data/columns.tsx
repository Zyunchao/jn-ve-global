import { FormProps, InfoColumnProps } from '@component/index'

export const columns: InfoColumnProps[] = [
    {
        prop: 'name',
        label: '姓名',
        width: 150,
        isQuery: true
    },
    {
        prop: 'instituId',
        label: '机构编码',
        width: 160
    },
    {
        prop: 'instituName',
        label: '机构名称',
        width: 200
    },
    {
        prop: 'loginName',
        label: '用户登录名',
        width: 150
    },
    {
        prop: 'identity',
        label: '用户身份',
        width: 140
    },
    {
        prop: 'sex',
        label: '性别',
        width: 100
    },
    {
        prop: 'idType',
        label: '证件类型',
        width: 240
    },
    {
        prop: 'idNumber',
        label: '证件号码',
        width: 240
    },
    {
        prop: 'phone',
        label: '手机',
        width: 200
    },
    {
        prop: 'email',
        label: '邮箱',
        width: 200
    },
    {
        prop: 'status',
        label: '用户状态',
        width: 80,
        render(item, index) {
            return (
                <el-tag size='small' class='ml-2' type={item.status === '0' ? 'success' : 'danger'}>
                    {item.status === '0' ? '正常' : '禁用'}
                </el-tag>
            )
        }
    }
]
