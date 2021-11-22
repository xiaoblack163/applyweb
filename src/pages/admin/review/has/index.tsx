import React  from "react";
import { Table, Space, Select } from 'antd'
import useColumns from './useColumns'
import { useApiSelector } from 'src/hooks'
import { dispatchAsync, useRequest } from '@friday/async'
import { isEmpty, get } from 'lodash'
import { useImmer }  from '@friday/immer'



const Index = () => {

    const apis = useApiSelector()

    

    const gatList = (arr, filterObj) => {
        if (isEmpty(arr)) return []
        return arr.filter(item => {
            return item.scoring == filterObj.scoring &&
            (filterObj.productType ? item.productType  == filterObj.productType : true) &&
            (filterObj.entryDirection ?  item.entryDirection  == filterObj.entryDirection: true) 
        })

    }

    const [state, setState] = useImmer({
        scoring:true,
        productType: '',
        entryDirection: ''
    })

    const {dataArray, isValidating, revalidate} = useRequest(apis.admin.reviewList({}))

    const list = gatList(dataArray, state)

    const columns = useColumns(revalidate)



    return (
        <div>
            <h4 className='m-head'>已评审作品</h4>
            <div className='clearfix mg-b-10'>
                <Space>
                    <div>
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
                    </div>
                    <div>
                        参赛方向： 
                        <Select style={{width: '140px'}} allowClear placeholder='请选择参赛方向' onChange={(e) => setState(draft => { draft.productType = e as any })}>
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
                scroll={{
                    x: 'max-content'
                }}
                loading={isValidating}
                rowKey={'id'}
            />
        </div>
    )
}

export default Index