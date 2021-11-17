import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from '@friday/router'
import { useHistory, useParams } from '@friday/router'
import { useApiSelector, useUserInfo } from 'src/hooks'
import { dispatchAsync } from '@friday/async'
import TokenService from 'src/services/tokenService'
import './index.less'

const FormItem = Form.Item

const Index = () => {

    const [form] = Form.useForm()

    const { type } = useParams() as any

    const apis = useApiSelector()

    const {dispatchUserInfo} = useUserInfo()
    
    const history = useHistory()


    const onFinish = async () => {
        const values = await form.validateFields()
        const respone = await dispatchAsync(type == 'review' ? apis.admin.reviewLogin(values) : apis.admin.manageLogin(values)) as any
        if (respone.error) return 
        TokenService.set(respone?.token.token)
        dispatchUserInfo(respone.dataJson)
        message.success('登录成功')
        history.push(`/admin/${type}has`)
    } 

    return (
        <div className='m-login'>
            <div className='m-login-header'>
                洪合杯
            </div>
            <div className='m-login-content'>
                <div className='m-login-main'>
                    <h3 className='m-title'>登录</h3>
                    <Form 
                        form={form}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <FormItem 
                            name='username'
                            label='账号'
                            rules={[{required: true, message: '请输入账号'}]}
                        >
                            <Input  placeholder="请输入账号" size='middle' />
                        </FormItem>
                        <FormItem 
                            name='password'
                            label='密码'
                            rules={[{required: true, message: '请输入密码'}]}
                        >
                            <Input type="password" placeholder="请输入密码" size='middle' />
                        </FormItem>
                        <Form.Item>
                            <Button
                                className="login-form-button"
                                type="primary"
                                htmlType="submit"
                                size='middle'
                                block
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Index