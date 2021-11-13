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
                    <Form form={form} 
                        labelCol={{ span: 5 }}
                        onFinish={onFinish}
                    >
                        <FormItem name='username' label='用户名'>
                            <Input  placeholder="请输入您的账号！" size='middle' />
                        </FormItem>
                        <FormItem name='password' label='密码' >
                            <Input  type="password" placeholder="请输入您的密码" size='middle' />
                        </FormItem>
                        <FormItem name='name' label='真实姓名'>
                            <Input  placeholder="请输入您的真实姓名" size='middle' />
                        </FormItem>
                        <FormItem name='sex' label='性别' initialValue={0}>
                            <Radio.Group >
                                <Radio value={0}>男</Radio>
                                <Radio value={1}>女</Radio>
                            </Radio.Group>
                        </FormItem>
                        <FormItem name='phone' label='手机号' rules={[{required: true, message: '请输入正确的手机号！', pattern: /^1[3456789]\d{9}$/ }]} >
                            <Input  placeholder="请输入您的手机号！" size='middle' />  
                        </FormItem>
                        <FormItem name='code' label='验证码'>
                            <Input  
                                placeholder="请输入您的验证码！" 
                                size='middle' 
                                maxLength={6}
                                suffix={<a onClick={() => sendCode()}>
                                  {isShowCode ? `${time}秒后重新发送` : '发送验证码'}
                                </a>}
                            />
                        </FormItem>
                        <FormItem name='area' label='地区'>
                            <Cascader options={options} placeholder="请选择" />
                        </FormItem>
                        <FormItem name='school' label='学校'>
                            <Input  placeholder="请输入您的学校！" size='middle' />
                        </FormItem>
                        <FormItem name='email' label='电子邮箱'>
                            <Input  placeholder="请输入您的电子邮箱！" size='middle' />
                        </FormItem>
                        <FormItem name='wechat' label='微信号'>
                            <Input  placeholder="请输入您的微信号！" size='middle' />
                        </FormItem>
                        <FormItem name='address' label='地址'>
                            <Input  placeholder="请输入您的地址！" size='middle' />
                        </FormItem>
                        <Row style={{marginBottom: 10}}>
                            <Col span={12} className='tf operation'>
                                <Link to='/user/login'>
                                    已有账号，去登录
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