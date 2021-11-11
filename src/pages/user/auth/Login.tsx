import React from 'react'
import { Form, Input, Button, Row, Col} from 'antd'
import { Link } from '@friday/router'
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
                            <Col span={12} className='tf operation'>
                                <Link to='/user/register'>
                                    注册账号
                                </Link>
                            </Col>
                            <Col span={12} className='tr operation'>
                                <Link to='/user/reset'>
                                    忘记密码？
                                </Link>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button
                                className="login-form-button"
                                type="primary"
                                htmlType="submit"
                                size='large'
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