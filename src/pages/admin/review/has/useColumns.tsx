import React from "react";
import { Divider, Space, Popover, Modal, message } from 'antd'
import { Link } from '@friday/router'
import { get } from 'lodash'
import { useConfiguration } from '@friday/core'
import { useApiSelector } from 'src/hooks'
import { dispatchAsync, useRequest } from '@friday/async'


const useColumns = (revalidate) => {

    const { publicUrl } = useConfiguration()
    const apis = useApiSelector()

    const submit =(id) => {
        Modal.confirm({
            content: '确定要提交',
            onOk: async () => {
                const {error} = await dispatchAsync(apis.admin.signupScoringInfo({id}))
                if (error) return 
                message.success('提交成功')
                revalidate()
            }
        })
    }

    return React.useMemo(() => {
        const columns = [{
            title: '作品名称',
            dataIndex: 'productName'
        },  {
            title: '参赛类别',
            dataIndex: 'productType'
        }, {
            title: '参赛方向',
            dataIndex: 'entryDirection'
        }, {
            title: '分数',
            dataIndex: 'sum',
        }, {
            title: '操作',
            dataIndex: 'opr',
            fixed: 'right',
            render: (text, record) => {
                const {save, id} = record
                return (
                    <Space split={<Divider />}>  
                        {save == 1 ? 
                            <span className='grey' > 已提交</span> :
                            <span className='operation' onClick={() => submit(id)}> 提交</span> 
                        }
                    </Space>
                )
            }
        }]
    
        return columns
    
    }, [])
} 

export default useColumns