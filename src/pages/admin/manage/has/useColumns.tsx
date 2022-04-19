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
            title: '参赛作品编号',
            dataIndex: 'id'
        },  {
            title: '参赛组别',
            dataIndex: 'productType'
        }, {
            title: '参赛者姓名',
            dataIndex: 'name'
        },  {
            title: '参赛作品名称',
            dataIndex: 'productName'
        },{
            title: '参赛者学校',
            dataIndex: 'school'
        },  {
            title: '推荐人',
            dataIndex: 'recommendName'
        },  {
            title: '上传作品时间',
            dataIndex: 'ctime'
        }, {
            title: '联系电话',
            dataIndex: 'contact'
        }, {
            title: '参赛者地址',
            dataIndex: 'address'
        }, {
            title: '参赛者邮箱',
            dataIndex: 'email'
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
            title: '评委评分个数',
            dataIndex: 'reviewCount'
        },{
            title: '总分',
            dataIndex: 'sum'
        },{
            title: '操作',
            dataIndex: 'opr',
            fixed: 'right',
            render: (text, record) => {
                return (
                    <Space split={<Divider type="vertical" />} >  
                        <span className='operation'>
                            <Link to={`/admin/manage/${record.id}/score`}>
                                查看评分详情
                            </Link >
                        </span>
                        <span className='operation'>
                            <Link to={{pathname: `/admin/manage/${record.id}`, state: {
                                name: record.name,
                                school: record.school,
                                contact: record.contact
                            }}}>
                                查看作品详情
                            </Link >
                        </span>
                    </Space>
                )
            }
        }]
    
        return columns
    
    }, [])
} 

export default useColumns