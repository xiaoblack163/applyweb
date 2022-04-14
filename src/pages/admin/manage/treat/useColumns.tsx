/*
 * @Author: baishijie
 * @Date: 2021-11-24 00:50:23
 * @LastEditors: baishijie
 * @LastEditTime: 2022-01-12 17:48:27
 * @FilePath: /applyweb/src/pages/admin/manage/treat/useColumns.tsx
 */
import React from "react";
import { Divider, Space, Popover, Switch, message } from 'antd'
import { Link } from '@friday/router'
import { get } from 'lodash'
import { useConfiguration } from '@friday/core'
import { dispatchAsync } from '@friday/async'
import { useApiSelector } from 'src/hooks'


const useColumns = (refresh) => {

    const { publicUrl } = useConfiguration()

    const apis = useApiSelector()

    const onChange = async (text, id) => {
        const { error } =await  dispatchAsync(apis.admin.updateShow({show: !text, id})) 
        if (error) return 
        message.success('更新成功')
        refresh()
    }

    return React.useMemo(() => {
        const columns = [
            {
                title: '是否展示',
                dataIndex: 'show',
                render: (text, record) => {
                   return <Switch checkedChildren="显示" unCheckedChildren="隐藏" checked={text} onChange={() => onChange(text, record.id)} />
                }
            },
        {
            title: '参赛作品编号',
            dataIndex: 'id'
        }, 
        // {
        //     title: '缩略图',
        //     dataIndex: 'productPics',
        //     width: '150px',
        //     render: (txt) => {
        //         const imgUrl = get(eval(txt), '[0]')
        //         const img =  publicUrl.OPEN_IMG_URL + imgUrl
        //         return (
        //             <div className='m-img-thumbs'>
        //                 <Popover content={<img src={img} />}>
        //                     <img src={img} />
        //                 </Popover>
        //             </div>
        //         )
        //     }
        // }, 
        {
            title: '参赛组别',
            dataIndex: 'productType'
        }, {
            title: '参赛者姓名',
            dataIndex: 'name'
        }, {
            title: '参赛作品名称',
            dataIndex: 'productName'
        },  {
            title: '参赛者学校',
            dataIndex: 'school'
        },  {
            title: '推荐人',
            dataIndex: 'recommendName'
        },  {
            title: '联系电话',
            dataIndex: 'contact'
        },  {
            title: '上传作品时间',
            dataIndex: 'ctime'
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
                            <Link to={`/admin/manage/${record.id}`}>
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