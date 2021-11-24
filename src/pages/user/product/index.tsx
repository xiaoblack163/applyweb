import React  from "react";
import { Table, Button, PageHeader, Card } from 'antd'
import useColumns from './useColumns'
import { Link } from '@friday/router'
import { useApiSelector } from 'src/hooks'
import { useConfiguration } from '@friday/core'
import { dispatchAsync, useRequest } from '@friday/async'


const Index = () => {

    const apis = useApiSelector()

    const { publicUrl } = useConfiguration()

    const columns = useColumns(publicUrl)

    const {dataArray, isValidating} = useRequest(apis.user.productList({}))


    return (
        <div>
             <PageHeader 
                title='作品列表'
                ghost={false}
                className='mg-b-10'
            />
            <Card hoverable>
            <div className='mg-b-20'>
                <Button type='primary'><Link to='/user/product/add' >添加作品</Link></Button>
            </div>

            <Table 
                columns={columns as any}
                dataSource={dataArray}
                loading={isValidating}
                rowKey='id'
                scroll={{
                    x: 'max-content'
                }}
            />
            </Card>
        </div>
    )
}

export default Index