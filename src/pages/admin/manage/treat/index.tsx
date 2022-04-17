/*
 * @Author: baishijie
 * @Date: 2021-11-17 17:15:25
 * @LastEditors: baishijie
 * @LastEditTime: 2022-02-08 18:31:25
 * @FilePath: /applyweb/src/pages/admin/manage/treat/index.tsx
 */
import React  from "react";
import { Table, Space, Select, PageHeader, Card, Button } from 'antd'
import useColumns from './useColumns'
import { useApiSelector } from 'src/hooks'
import { dispatchAsync, useRequest } from '@friday/async'
import { isEmpty, get } from 'lodash'
import { useImmer }  from '@friday/immer'
import cookie from 'js-cookie'


const Index = () => {

    const apis = useApiSelector()

    const cPage = cookie.get('page3') || 1

    const [page, changePage] = React.useState(Number(cPage))

    const pageChange = (page) => {
        changePage(page)
        cookie.set('page3', page)
    }

    const gatList = (arr, filterObj) => {
        if (isEmpty(arr)) return []
        return arr.filter(item => {
            return filterObj.productType ? item.productType  == filterObj.productType : true
        })

    }

    const [state, setState] = useImmer({
        scoring:false,
        productType: '',
        entryDirection: '',
        selectkeys: []
    })

    const {dataArray, isValidating, revalidate} = useRequest(apis.admin.manageList({type: 0}))

    const columns = useColumns(revalidate)

    const list = gatList(dataArray, state)

    const onChange = (keys) => {
        setState(dart => {dart.selectkeys = keys})
    }

    return (
        <div>
            <PageHeader 
                title='未评分作品'
                ghost={false}
                className='mg-b-10'
            />
            <Card hoverable>
                <div className='clearfix mg-b-20'>
                    <Space>
                        {/* <div>
                            参赛类别：
                            <Select style={{width: '140px'}} 
                                allowClear 
                                placeholder='请选择参赛类别' 
                                onChange={(e) => setState(dart => { dart.entryDirection = e as any })}
                            >
                                <Select.Option value={'系列服装类'}>系列服装类</Select.Option >
                                <Select.Option value={'经典套装类'}>经典套装类</Select.Option >
                                <Select.Option value={'毛衫文化品牌类'}>毛衫文化品牌类</Select.Option >
                            </Select>
                        </div> */}
                        <div>
                            参赛类别： 
                            <Select style={{width: '140px'}} allowClear placeholder='请选择参赛类别' onChange={(e) => setState(draft => { draft.productType = e as any })}>
                                <Select.Option value={'个人组'}>个人组</Select.Option>
                                <Select.Option value={'团体组'}>团体组</Select.Option>
                                <Select.Option value={'企业组'}>企业组</Select.Option>
                            </Select>
                        </div>
                        {state.selectkeys.length > 0 && 
                            <Button>导出图片</Button>
                        }
                    </Space>
                </div>
                <Table 
                    columns={columns as any}
                    dataSource={list}
                    scroll={{
                        x: 'max-content'
                    }}
                    loading={isValidating}
                    rowKey={'id'}
                    pagination={{
                        current: page,
                        onChange: (page) => pageChange(page)
                    }}
                />
            </Card>
        </div>
    )
}

export default Index