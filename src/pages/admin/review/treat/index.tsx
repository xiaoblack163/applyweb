/*
 * @Author: baishijie
 * @Date: 2021-11-17 17:15:25
 * @LastEditors: baishijie
 * @LastEditTime: 2022-02-08 18:28:14
 * @FilePath: /applyweb/src/pages/admin/review/treat/index.tsx
 */
import React  from "react";
import { Table, Space, Select, PageHeader, Card } from 'antd'
import useColumns from './useColumns'
import { useApiSelector } from 'src/hooks'
import { dispatchAsync, useRequest } from '@friday/async'
import { isEmpty, get } from 'lodash'
import { useImmer }  from '@friday/immer'
import cookie from 'js-cookie'



const Index = () => {

    const apis = useApiSelector()

    const columns = useColumns()

    const cPage = cookie.get('page') || 1

    const [page, changePage] = React.useState(Number(cPage))

    const pageChange = (page) => {
        changePage(page)
        cookie.set('page', page)
    }
    

    const gatList = (arr, filterObj) => {
        if (isEmpty(arr)) return []
        return arr.filter(item => {
            return item.scoring == filterObj.scoring &&
            (filterObj.productType ? item.productType  == filterObj.productType : true) &&
            (filterObj.entryDirection ?  item.entryDirection  == filterObj.entryDirection: true) 
        })

    }

    const [state, setState] = useImmer({
        scoring:false,
        productType: '',
        entryDirection: ''
    })

    const {dataArray, isValidating} = useRequest(apis.admin.reviewList({}))

    const list = gatList(dataArray, state)



    return (
        <div>
            <PageHeader 
                title='未评审作品'
                ghost={false}
                className='mg-b-10'
            />
            <Card hoverable>
            <div className='clearfix mg-b-20'>
                <Space>
                    <div>
                        参赛方向：
                        <Select style={{width: '140px'}} 
                            allowClear 
                            placeholder='请选择参赛方向' 
                            onChange={(e) => setState(dart => { dart.entryDirection = e as any })}
                        >
                            <Select.Option value={'系列服装类'}>系列服装类</Select.Option >
                            <Select.Option value={'经典套装类'}>经典套装类</Select.Option >
                            <Select.Option value={'毛衫文化品牌类'}>毛衫文化品牌类</Select.Option >
                        </Select>
                    </div>
                    <div className="mg-l-20">
                        参赛类别： 
                        <Select style={{width: '140px'}} allowClear placeholder='请选择参赛类别' onChange={(e) => setState(draft => { draft.productType = e as any })}>
                            <Select.Option value={'个人组'}>个人组</Select.Option>
                            <Select.Option value={'团体组'}>团体组</Select.Option>
                            <Select.Option value={'企业组'}>企业组</Select.Option>
                        </Select>
                    </div>
                </Space>
            </div>
            <Table 
                columns={columns as any}
                dataSource={list}
                size={'middle'}
                scroll={{
                    x: 'max-content'
                }}
                pagination={{
                    current: page,
                    onChange: (page) => pageChange(page)
                }}
                loading={isValidating}
                rowKey={'id'}
            />
            </Card>
        </div>
    )
}

export default Index