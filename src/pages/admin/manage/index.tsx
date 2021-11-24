import React from 'react'
import { message, Table, PageHeader, Card} from 'antd'
import { useApiSelector } from 'src/hooks'
import { dispatchAsync, useRequest } from '@friday/async'
import { useParams, useHistory } from '@friday/router'

const columns = [{
    title: '评委id',
    dataIndex: 'userId'
}, {
    title: '作品id',
    dataIndex: 'signupId'
},{
    title: '原创性',
    dataIndex: 'itemA'
},{
    title: '创新性',
    dataIndex: 'itemB'
},{
    title: '美观性',
    dataIndex: 'itemC'
},{
    title: '系列性',
    dataIndex: 'itemD'
},{
    title: '工业性',
    dataIndex: 'itemE'
},{
    title: '商业价值',
    dataIndex: 'itemF'
},{
    title: '总分',
    dataIndex: 'sum'
},{
    title: '是否保存',
    dataIndex: 'save',
    render: (text) => {
        if (text == 0) return '已保存'
        if (text == 1) return '已提交'
        return ''
    }
}]


const Index = () => {
    const apis = useApiSelector()
    
    const history =useHistory()
    const { id } = useParams() as any

    const { dataArray } = useRequest(apis.admin.manageInfo({id}))

    return (
        <div>
            <PageHeader 
                title='评分详情'
                ghost={false}
                className='mg-b-10'
                onBack={() => history.goBack()}
            />
            <Card hoverable>
                <Table 
                    columns={columns}
                    dataSource={dataArray}
                    scroll={{
                        x: 'max-content'
                    }}
                />
            </Card>
        </div>
    )
}

export default Index
