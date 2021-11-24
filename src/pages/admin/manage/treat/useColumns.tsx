import React from "react";
import { Divider, Space, Popover } from 'antd'
import { Link } from '@friday/router'
import { get } from 'lodash'
import { useConfiguration } from '@friday/core'


const useColumns = () => {

    const { publicUrl } = useConfiguration()

    return React.useMemo(() => {
        const columns = [{
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
        }, {
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
        }]
    
        return columns
    
    }, [])
} 

export default useColumns