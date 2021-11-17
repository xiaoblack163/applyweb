import React from 'react'
import { Form, Input, Row, Col, Radio, Button} from 'antd'
import FormLabel from './FormLabel'
import './index.less'

const FormItem = Form.Item


const Index = () => {

    const [form] = Form.useForm()

    return (
        <div className='m-info'>
            <h4 className='m-head'>完善个人信息</h4>
            <Form 
                form={form}
                labelCol={{span: 7}}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem
                            label={<FormLabel name='用户名' en='User name' />}
                            rules={[{required: true, message: '请输入用户名'}]}
                        >
                            <Input placeholder='请输入用户名' />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='姓名' en='Name' required />}
                            rules={[{
                                required: true, 
                                message: '请输入姓名', 
                            }]}
                        >
                            <Input placeholder='请输入姓名'/>
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='性别' en='Gender' required />}
                            rules={[{
                                required: true, 
                                message: '请选择性别', 
                            }]}
                        >
                            <Radio.Group>
                                <Radio value={0}>男</Radio>
                                <Radio value={1}>女</Radio>
                            </Radio.Group>
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='照片' en='Photo' required />}
                            rules={[{
                                required: true, 
                                message: '请上传照片', 
                            }]}
                        >
                            <Input />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label={<FormLabel name='出生年/月/日' en='Birth date' required />}
                            rules={[{
                                required: true, 
                                message: '请选择出生年月日', 
                            }]}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='身份证号码' en='ID Card No.' required />}
                            rules={[{
                                required: true, 
                                message: '请输入身份证号码', 
                            }]}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='身份证复印照' en='ID Card Copy' required />}
                        >
                            <Input />
                        </FormItem>
                    </Col>
                </Row>

                <Row gutter={16} className='mg-t-20'>
                    <Col span={12}>
                        <FormItem
                            label={<FormLabel name='职业' en='Occupation' required />}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='籍贯' en='Native place' required />}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='院校名称' en='Educational background' required />}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='专业' en='specialty' required />}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='学历' en='Education background' required />}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='工作单位' en='Company' required />}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='QQ号' en='QQ' required />}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='微信号' en='WeChat' required />}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='邮箱' en='E-mail' required />}
                        >
                            <Input />
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label={<FormLabel name='通信地址' en='Address' required />}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='联系方式' en='Contact' required />}
                        >
                            <Input />
                        </FormItem>
                    </Col>
                </Row>
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
