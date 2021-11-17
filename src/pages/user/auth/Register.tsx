import React, { useState } from 'react'
import { Form, Input, Button, Row, Col, Radio, message, Cascader } from 'antd'
import { Link, useHistory  } from '@friday/router'
import { dispatchAsync } from '@friday/async'
import { useApiSelector, useUserInfo } from 'src/hooks'
import options from 'src/common/city.json'
import { omit } from 'lodash'
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
        const { phone } = fileds
        const { error, data } = await dispatchAsync(apis.user.sendCode({
            phone,
            type: 0
        }))
        if (error) return message.error(error)
        message.success('发送成功')
    }

    const onFinish = async () => {
        const values = await form.validateFields()
        const [province, city] = values.area
        const respone = await dispatchAsync(apis.user.register({
            ...omit(values, 'area'),
            province,
            city
        })) as any
        if (respone.error) return 
        message.success('注册成功')
        history.push('/user')
    } 

    return (
        <div className='m-login'>
            <div className='m-login-header'>
                洪合杯
            </div>
            <div className='m-login-content'>
                <div className='m-login-main'>
                    <h3 className='m-title'>注册</h3>
                    <Form form={form} 
                        labelCol={{ span: 5 }}
                        onFinish={onFinish}
                        wrapperCol={{span: 19}}
                        layout="vertical"
                    >
                        <FormItem 
                            name='phone' 
                            label='手机号' 
                            rules={[{required: true, message: '请输入正确的手机号！', pattern: /^1[3456789]\d{9}$/ }]} 
                        >
                            <Input placeholder="请输入手机号！" size='middle' />  
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
                            name='password' 
                            label='密码' 
                            rules={[{required: true, message: '请输入密码'}]}
                        >
                            <Input  type="password" placeholder="请输入密码（6-20个字符）" size='middle' />
                        </FormItem>
                        <FormItem 
                            name='pw2' 
                            label='确认密码' 
                            rules={[
                                ({getFieldValue})=>({
                                    validator(rule,value){
                                        if(!value || getFieldValue('password') === value){
                                            return Promise.resolve()
                                        }
                                        return Promise.reject("两次密码输入不一致")
                                    }
                                })
                            ]}
                        >
                            <Input type="password" placeholder="请再次输入密码" size='middle' />
                        </FormItem>
                        <Form.Item  wrapperCol={{span: 24}}>
                            <Button
                                className="login-form-button"
                                type="primary"
                                htmlType="submit"
                                size='middle'
                                block
                            >
                                注册
                            </Button>
                        </Form.Item>
                        <div className='tc  mg-b-20' style={{fontSize: '12px'}}>
                            <Link to='/user/login' className='grey'>
                                已有账号，直接登录
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Index