import React  from "react";
import { Table, Button } from 'antd'
import useColumns from './useColumns'
import { Link } from '@friday/router'
import { useApiSelector } from 'src/hooks'
import { useConfiguration } from '@friday/core'
import { dispatchAsync, useRequest } from '@friday/async'


const Index = () => {

    const apis = useApiSelector()

    const { publicUrl } = useConfiguration()

    const columns = useColumns(publicUrl)

    const {dataJson, isValidating} = useRequest(apis.user.productList({}))


    return (
        <div>
            
            <div className='mg-b-10'>
                <Button type='primary'><Link to='/user/product/add' >添加作品</Link></Button>
            </div>

            <Table 
                columns={columns as any}
                dataSource={[{...dataJson, id: 1}]}
                loading={isValidating}
                rowKey='id'
                scroll={{
                    x: 'max-content'
                }}
            />
        </div>
    )
}

export default Index