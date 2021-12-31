/*
 * @Author: your name
 * @Date: 2021-11-18 14:36:07
 * @LastEditTime: 2021-12-31 14:29:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /applyweb/src/pages/user/product/useColumns.tsx
 */
import React from "react";
import { Divider, Space, Popover, Modal, message, Button } from 'antd'
import { Link } from '@friday/router'
import { get } from 'lodash'
import { dispatchAsync, useRequest } from '@friday/async'
import { apis } from "src/apiStore";
import ImgPreview from './ImgPreview'


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
                    <ImgPreview 
                        url={img}
                        list={eval(txt)}
                    />
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