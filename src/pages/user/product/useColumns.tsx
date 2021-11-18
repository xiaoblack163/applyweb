import React from "react";
import { Divider, Space } from 'antd'
import { Link } from '@friday/router'


const useColumns = () => {
    return React.useMemo(() => {
        const columns = [{
            title: '作品名称',
            dataIndex: 'productName'
        }, {
            title: '缩略图',
            dataIndex: ''
        }, {
            title: '参赛类别',
            dataIndex: 'productType'
        }, {
            title: '参赛方向',
            dataIndex: 'entryDirection'
        }, {
            title: '作品状态',
            dataIndex: 'opr',
            render: () => '已提交'
        }, {
            title: '操作',
            dataIndex: 'opr',
            render: () => {
                return (
                    <Space split={<Divider />}>  
                        <span className='operation'>
                            <Link to='/user/product/edit/1'>
                                编辑 
                            </Link >
                        </span>
                        <span className='operation'>删除 </span>
                    </Space>
                )
            }
        }]
    
        return columns
    
    }, [])
} 

export default useColumns