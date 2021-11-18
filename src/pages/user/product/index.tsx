import React  from "react";
import { Table, Button } from 'antd'
import useColumns from './useColumns'
import { Link } from '@friday/router'
import { useApiSelector } from 'src/hooks'
import { dispatchAsync, useRequest } from '@friday/async'


const Index = () => {

    const apis = useApiSelector()

    const columns = useColumns()

    const {dataJson, isValidating} = useRequest(apis.user.productList({}))


    return (
        <div>
            
            <div className='mg-b-10'>
                <Button type='primary'><Link to='/user/product/add' >添加作品</Link></Button>
            </div>

            <Table 
                columns={columns}
                dataSource={[{...dataJson, id: 1}]}
                loading={isValidating}
                rowKey='id'
            />
        </div>
    )
}

export default Index