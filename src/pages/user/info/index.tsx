import React from 'react'
import { useApiSelector, useUserInfo } from 'src/hooks'
import { Button, Descriptions } from 'antd'
import { useRequest } from '@friday/async'
import { Link } from '@friday/router'

const Index = () => {

    const apis = useApiSelector()

    const { dataJson } = useRequest(apis.user.fetchUserInfo({}))

    console.log(dataJson, 'dataJson')

    const { name, email, address, contact} = dataJson


    return (
        <div>
            <h4 className='m-head'>个人信息</h4>
            <Descriptions title={name} extra={<Button type='primary'><Link to='/user/info/edit'>修改个人信息</Link></Button>} column={1}>
                <Descriptions.Item label='邮箱地址'>{email}</Descriptions.Item>
                <Descriptions.Item label='通讯地址'>{address}</Descriptions.Item>
                <Descriptions.Item label='联系方式'>{contact}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default Index