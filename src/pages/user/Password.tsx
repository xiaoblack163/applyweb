/*
 * @Author: your name
 * @Date: 2021-11-17 17:15:25
 * @LastEditTime: 2022-01-04 13:48:58
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /applyweb/src/pages/user/Password.tsx
 */
import React from 'react'
import { Form, Input, Button, message, PageHeader, Card } from 'antd'
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
            <PageHeader 
                title='修改密码'
                ghost={false}
                className='mg-b-10'
            />
            <Card hoverable>
            <Form
                form={form}
                labelCol={{xs: 6, md: 6}}
                wrapperCol={{xs: 12, md: 12}}
                onFinish={onFinish}
            >
                <FormItem name='phone' label='手机号' rules={[{required: true, message: '请输入您的手机号！'}]} >
                    <Input  placeholder="请输入您的手机号！" size='middle' />
                </FormItem>
                <FormItem name='oldPwd' label='旧密码' rules={[{required: true, message: '请输入您的旧密码！'}]}>
                    <Input  placeholder="请输入您的旧密码！" type='password' size='middle' />
                </FormItem>
                <FormItem name='newPwd' label='新密码' rules={[{required: true, message: '请输入您的新密码！', pattern: /^[0-9A-Za-z]{6,}$/}]}>
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
            </Card>
        </div>
    )
}

export default Index