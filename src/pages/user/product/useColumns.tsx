import React from "react";
import { Divider, Space, Popover, Modal, message, Button } from 'antd'
import { Link } from '@friday/router'
import { get } from 'lodash'
import { dispatchAsync, useRequest } from '@friday/async'
import { apis } from "src/apiStore";


const useColumns = ( publicUrl, revalidate) => {

    const deleteId = (id) => {
        Modal.confirm({
            title: '确定要删除吗？',
            onOk: async () => {
                const {error} = await dispatchAsync(apis.user.deleteId({id}))
                if (error) return 
                revalidate()
                message.success('删除成功')
            }
        })
    }

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
                        <Button type="primary" size="small">
                            <Link to={`/user/product/edit/${record.id}`}>
                                编辑
                            </Link >
                        </Button>
                        <Button size="small" onClick={() => deleteId(record.id)}>删除 </Button>
                    </Space>
                )
            }
        }]
    
        return columns
    
    }, [])
} 

export default useColumns