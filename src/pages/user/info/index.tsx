import React from 'react'
import { useApiSelector, useUserInfo } from 'src/hooks'
import { Button, Descriptions, PageHeader, Card } from 'antd'
import { useRequest } from '@friday/async'
import { Link } from '@friday/router'

const Index = () => {

    const apis = useApiSelector()

    const { dataJson } = useRequest(apis.user.fetchUserInfo({}))

    console.log(dataJson, 'dataJson')

    const { name, email, address, contact} = dataJson


    return (
        <div>
            <PageHeader 
                title='个人信息'
                ghost={false}
                className='mg-b-10'
                extra={<Button type='primary'><Link to='/user/info/edit'>修改个人信息</Link></Button>}
            />
            <Card>
                <Descriptions title={name}  column={1}>
                    <Descriptions.Item label='邮箱地址'>{email}</Descriptions.Item>
                    <Descriptions.Item label='通讯地址'>{address}</Descriptions.Item>
                    <Descriptions.Item label='联系方式'>{contact}</Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    )
}

export default Index