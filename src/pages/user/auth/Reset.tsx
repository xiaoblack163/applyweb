import React, {useState} from 'react'
import { Form, Input, Button, Row, Col, message} from 'antd'
import { Link, useHistory  } from '@friday/router'
import { useApiSelector } from 'src/hooks'
import { dispatchAsync } from '@friday/async'
import loginLoign from 'src/pages/home/images/login-m.png'
import './index.less'

const FormItem = Form.Item

const Index = () => {

    const [form] = Form.useForm()
    const apis = useApiSelector()

    const [time, setTime] = useState(60)
    const [isShowCode, setIsShowCode] = useState<boolean>(false)
    const history = useHistory()

    const sendCode = async () => {
        const fileds = await form.validateFields(['phone'])
        if (isShowCode) {
            return 
        }
        const { phone } = fileds
        const { error, data } = await dispatchAsync(apis.user.sendCode({
            phone,
            type: 1
        }))
        if (error) return
        setIsShowCode(true)
        const active = setInterval(() => {
            setTime((preSecond) => {
              if (preSecond <= 1) {
                setIsShowCode(false)
                clearInterval(active)
                // 重置秒数
                return 60
              }
              return preSecond - 1
            })
        }, 1000)
        message.success('发送成功')
    }

    const onFinish = async () => {
        const values = await form.validateFields()
        const respone = await dispatchAsync(apis.user.reset(values)) as any
        if (respone.error) return 
        message.success('重置成功')
        history.push('/user/login')
    } 

    return (
        <div className='m-login'>
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
                    <Form 
                        form={form}
                        labelCol={{ span: 5 }}
                        onFinish={onFinish}
                        layout="vertical"
                        
                    >
                        <FormItem 
                            name='phone' 
                            label='手机号'
                            rules={[{
                                required: true, 
                                message: '请输入正确的手机号', 
                                pattern: /^1[3456789]\d{9}$/
                            }]}
                        >
                            <Input  placeholder="请输入手机号" size='middle' />
                        </FormItem>
                        <FormItem 
                            name='code' 
                            label='验证码'
                            rules={[{required: true, message: '请输入验证码'}]}
                        >
                            <Input  
                                placeholder="请输入验证码！" 
                                size='middle' 
                                maxLength={6}
                                suffix={<a onClick={() => sendCode()}>
                                  {isShowCode ? `${time}秒后重新发送` : '发送验证码'}
                                </a>}
                            />
                        </FormItem>
                        <FormItem 
                            name='newPwd' 
                            label='新密码'
                            rules={[{required: true, message: '请输入6位以上密码', pattern: /^[0-9A-Za-z]{6,}$/}]}
                        >
                            <Input type="password" placeholder="请输入6位以上密码" size='middle' />
                        </FormItem>
                        <Form.Item>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Button block>
                                        <Link to='/user/login'>取消</Link>
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button
                                        className="login-form-button"
                                        type="primary"
                                        htmlType="submit"
                                        size='middle'
                                        block
                                    >
                                        确定
                                    </Button>
                                </Col>
                            </Row>
                            
                        </Form.Item>
                    </Form>
                </div>
                </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Index