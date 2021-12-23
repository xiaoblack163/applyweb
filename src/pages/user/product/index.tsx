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


    const {dataArray, isValidating, revalidate} = useRequest(apis.user.productList({}))

    const columns = useColumns(publicUrl, revalidate)


    return (
        <div>
             <PageHeader 
                title='作品列表'
                ghost={false}
                className='mg-b-10'
            />
            <Card hoverable>
            <div className='mg-b-20 clearfix'>
                <div className="fr">
                    <Button type='primary'><Link to='/user/product/add' >添加作品</Link></Button>
                </div>
            </div>
            <Table 
                columns={columns as any}
                dataSource={dataArray}
                bordered={false}
                size="middle"
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