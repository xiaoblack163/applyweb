import React, {useEffect} from 'react'
import { Form, Input, Button, Row, Space, message} from 'antd'
import { Link } from '@friday/router'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useHistory } from '@friday/router'
import { useApiSelector, useUserInfo } from 'src/hooks'
import { dispatchAsync } from '@friday/async'
import TokenService from 'src/services/tokenService'
import loginLoign from 'src/pages/home/images/login-m.png'
import LoginLottie from './LoginLottie'
import LoadingCom from 'src/pages/layouts/LodingCom'
import './index.less'
import cookie from 'js-cookie'

const FormItem = Form.Item

const Index = () => {

    const [form] = Form.useForm()

    const [lottie, showLottie] = React.useState(true)

    const [loading, setLoading] = React.useState(true)

    const apis = useApiSelector()

    const {dispatchUserInfo} = useUserInfo()
    
    const history = useHistory()

    useEffect(() => {
		TokenService.clear()
        const isLoad = cookie.get('isLoaded')
        if (isLoad == 'true') {
            showLottie(false)
            setLoading(false)
        }
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
        <>
       
        <div className={lottie? 'm-login hide' : 'm-login show'}>
            <div className='m-login-b'>
                <div className='m-login-l'>
                </div>
                <div className='m-login-content'>
                    <div className='m-login-bg'>
                    <div className='m-login-main'>
                        <h3 className='m-title'>
                            <img src={loginLoign} />
                        </h3>
                        <div className='m-login-form'>
                        <Form form={form}
                            onFinish={onFinish}
                            layout="vertical"
                            
                        >
                            <FormItem 
                                label='账号登录' 
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
                            <div className='clearfix'>
                                <Space className='tc mg-b-20 fr' style={{fontSize: '12px'}}>
                                    <Link to='/user/reset' className='grey'>
                                        忘记密码
                                    </Link>
                                    <Link to='/user/register' className='grey' >
                                        注册
                                    </Link>
                                </Space>
                            </div>
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
                        <div>
                        </div>
                        <div style={{textAlign: 'center', fontSize: '10px', color: '#999'}}>First 2022 "HONGHEBEI" Sweater design competition</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={lottie ? 'lottie show' : "lottie hide"}>
            {loading && <LoadingCom /> }
            <div style={{background: '#fff', height: '100vh'}}>
                <LoginLottie showLottie={showLottie} setLoading={setLoading} />
            </div>
        </div>
        </>
    )
}

export default Index