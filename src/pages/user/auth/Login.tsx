import React, {useEffect} from 'react'
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

    useEffect(() => {
		TokenService.clear()
	}, [])


    const onFinish = async () => {
        const values = await form.validateFields()
        const respone = await dispatchAsync(apis.user.login(values)) as any
        if (respone.error) return 
        TokenService.set(respone?.token.token)
        dispatchUserInfo(respone.dataJson)
        const { complete } = respone.dataJson
        if (complete) {
            message.success('登录成功')
            history.push('/user/info')
        } else {
            message.warning('请完善个人信息')
            history.push('/user/info/edit')
        }
    } 

    return (
        <div className='m-login'>
            <div className='m-login-header'>
                洪合杯
            </div>
            <div className='m-login-content'>
                <div className='m-login-main'>
                    <h3 className='m-title'>登录</h3>
                    <Form form={form}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <FormItem 
                            label='手机号' 
                            name='username'
                            rules={[{
                                required: true, 
                                message: '请输入正确的手机号', 
                                pattern: /^1[3456789]\d{9}$/
                            }]}
                        >
                            <Input  placeholder="请输入手机号" size='middle' />
                        </FormItem>
                        <FormItem 
                            label='密码' 
                            name='password' 
                            rules={[{required: true, message: '请输入密码'}]}
                        >
                            <Input 
                                type="password" 
                                placeholder="请输入密码" 
                                size='middle' 
                            />
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
                    <div className='tc  mg-b-20' style={{fontSize: '12px'}}>
                        <Link to='/user/reset' className='grey'>
                            忘记密码
                        </Link>
                    </div>
                    <div className='tc grey mg-b-10' style={{fontSize: '12px'}}>还没有账号?</div>
                    <div>
                        <Button block >
                            <Link to='/user/register' >
                                注册
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index