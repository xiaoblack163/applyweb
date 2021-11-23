import React from "react";
import { Divider, Space, Popover } from 'antd'
import { Link } from '@friday/router'
import { get } from 'lodash'


const useColumns = ( publicUrl) => {
    return React.useMemo(() => {
        const columns = [{
            title: '作品名称',
            dataIndex: 'productName'
        }, {
            title: '缩略图',
            dataIndex: 'productPics',
            width: '150px',
            render: (txt) => {
                const imgUrl = get(eval(txt), '[0]')
                const img =  publicUrl.OPEN_IMG_URL + imgUrl
                return (
                    <div className='m-img-thumbs'>
                        <Popover content={<img src={img} />}>
                            <img src={img} />
                        </Popover>
                    </div>
                )
            }
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
            fixed: 'right',
            render: (text, record) => {
                return (
                    <Space split={<Divider />}>  
                        <span className='operation'>
                            <Link to={`/user/product/edit/${record.id}`}>
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