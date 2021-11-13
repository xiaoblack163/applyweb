import React from 'react'
import { Form, Input, Button, Row, Col, message} from 'antd'
import { Link } from '@friday/router'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useHistory } from '@friday/router'
import { useApiSelector, useUserInfo } from 'src/hooks'
import { dispatchAsync } from '@friday/async'
import TokenService from 'src/services/tokenService'
import './index.less'

const FormItem = Form.Item

const Index = () => {

    const [form] = Form.useForm()

    const apis = useApiSelector()

    const {dispatchUserInfo} = useUserInfo()
    
    const history = useHistory()


    const onFinish = async () => {
        const values = await form.validateFields()
        const respone = await dispatchAsync(apis.user.login(values)) as any
        if (respone.error) return 
        TokenService.set(respone?.token.token)
        dispatchUserInfo(respone.dataJson)
        message.success('登录成功')
        history.push('/user')
    } 

    return (
        <div className='m-login'>
            <div className='m-login-header'>
                洪合杯
            </div>
            <div className='m-login-content'>
                <div className='m-login-main'>
                    <Form form={form}
                        onFinish={onFinish}
                    >
                        <FormItem name='username'>
                            <Input prefix={<UserOutlined />} placeholder="请输入您的手机号或者账号！" size='middle' />
                        </FormItem>
                        <FormItem name='password' style={{marginBottom: 8}}>
                            <Input prefix={<LockOutlined />} type="password" placeholder="请输入您的密码！" size='middle' />
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