import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { useApiSelector } from 'src/hooks'
import { dispatchAsync } from '@friday/async'

const FormItem = Form.Item

const Index = () => {
    const [form] = Form.useForm()
    const apis = useApiSelector()

    const onFinish = async () => {
        const values = await form.validateFields()
        const respone = await dispatchAsync(apis.user.updatePassword(values)) as any
        if (respone.error) return 
        message.success('修改成功')
    } 
    return (
        <div>
            <h4 className='m-head'>修改密码</h4>
            <Form
                form={form}
                labelCol={{span: 3}}
                onFinish={onFinish}
            >
                <FormItem name='phone' label='手机号'>
                    <Input  placeholder="请输入您的手机号！" size='middle' />
                </FormItem>
                <FormItem name='oldPwd' label='旧密码'>
                    <Input  placeholder="请输入您的旧密码！" type='password' size='middle' />
                </FormItem>
                <FormItem name='newPwd' label='新密码'>
                    <Input  placeholder="请输入您的新密码！" type='password' size='middle' />
                </FormItem>
                <div className='tc' style={{width: '328px', margin: '0 auto'}}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size='middle'
                        block
                    >
                        保存
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Index