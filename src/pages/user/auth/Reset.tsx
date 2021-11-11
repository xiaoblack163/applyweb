import React from 'react'
import { Form, Input, Button, Row, Col} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './index.less'

const FormItem = Form.Item

const Index = () => {

    const [form] = Form.useForm()

    return (
        <div className='m-login'>
            <div className='m-login-header'>
                洪合杯
            </div>
            <div className='m-login-content'>
                <div className='m-login-main'>
                    <Form form={form}>
                        <FormItem name='phone'>
                            <Input prefix={<UserOutlined />} placeholder="请输入您的手机号！" size='large' />
                        </FormItem>
                        <FormItem name='password' style={{marginBottom: 8}}>
                            <Input prefix={<LockOutlined />} type="password" placeholder="请输入您的手机号！" size='large' />
                        </FormItem>
                        <Row style={{marginBottom: 10}}>
                            <Col span={12} className='tf operation'>已有账号，去登录</Col>
                        </Row>
                        <Form.Item>
                            <Button
                                className="login-form-button"
                                type="primary"
                                htmlType="submit"
                                size='large'
                                block
                            >
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Index