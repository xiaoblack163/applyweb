import React from 'react'
import { Form, Input, Row, Col, Radio, Button, DatePicker, Cascader, message} from 'antd'
import FormLabel from './FormLabel'
import options from 'src/common/city.json'
import UploadImg from './UploadImg'
import { useHistory } from '@friday/router'
import { useApiSelector, useUserInfo } from 'src/hooks'
import { useConfiguration } from '@friday/core'
import { dispatchAsync, useRequest } from '@friday/async'
import { omit, isEmpty, get, pick } from 'lodash'
import moment from 'moment'
import './index.less'

const FormItem = Form.Item


const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList
}

const getUpload = (uploadResponse) => {
    // 没图片
    if (isEmpty(uploadResponse)) return  ''

    return get(uploadResponse, '[0].response.filePath') || ''
}   

const transformUpload = (path, prefix) => {

    if (!path) return ''

    return [{
        response: {
            data: {
                path: path
            },
            filePath: path
        },
        status: "done",
        thumbUrl: prefix + path
    }]
}


const Index = () => {

    const [form] = Form.useForm()

    const apis = useApiSelector()
    
    const history = useHistory()

    const { publicUrl } = useConfiguration()

    const { dataJson } = useRequest(apis.user.fetchUserInfo({}))

    React.useEffect(() => {
        if (!isEmpty(dataJson)) {
            
            const {idcardBack, idcardFront, photo, province, city, county} = dataJson
            const area = [province, city, county]
            const payload = {
                ...omit(dataJson, ['birthday','idcardBack', 'idcardFront', 'photo']),    
                area,      
                idcardBack: transformUpload(idcardBack, publicUrl.OPEN_IMG_URL),
                idcardFront: transformUpload(idcardFront, publicUrl.OPEN_IMG_URL),
                photo: transformUpload(photo, publicUrl.OPEN_IMG_URL),
            }
            console.log(payload, 'payload')
            form.setFieldsValue(payload)
        }
    }, [dataJson]) 

    const onFinish = async () => {
        const values = await form.validateFields()
        const { birthday, area, idcardBack, idcardFront, photo } = values
        const [province, city, county] = area
        const respone = await dispatchAsync(apis.user.completeInfo({
            ...omit(values, ['birthday', 'area', 'idcardBack', 'idcardFront', 'photo']),
            birthday: moment(birthday).format('YYYY/MM/DD'),
            province,
            city,
            county,
            idcardBack: getUpload(idcardBack),
            idcardFront: getUpload(idcardFront),
            photo: getUpload(photo)
        })) as any
        if (respone.error) return 
        message.success('更新成功')
        history.push('/user/info')
        
    } 

    return (
        <div className='m-info'>
            <h4 className='m-head'>完善个人信息</h4>
            <Form 
                form={form}
                labelCol={{span: 7}}
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    <Col span={12} xs={24}>
                        <FormItem
                            label={<FormLabel name='用户名' en='User name' required />}
                            rules={[{required: true, message: '请输入用户名'}]}
                            name='username'
                        >
                            <Input placeholder='请输入用户名' />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='姓名' en='Name' required />}
                            rules={[{
                                required: true, 
                                message: '请输入姓名', 
                            }]}
                            name='name'
                        >
                            <Input placeholder='请输入姓名'/>
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='性别' en='Gender' required />}
                            rules={[{
                                required: true, 
                                message: '请选择性别', 
                            }]}
                            name='sex'
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
                            className='preview'
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            name='photo'
                        >
                            <UploadImg />
                        </FormItem>
                    </Col>
                    <Col span={12} xs={24}>
                        <FormItem
                            label={<FormLabel name='出生年/月/日' en='Birth date' required />}
                            rules={[{
                                required: true, 
                                message: '请选择出生年月日', 
                            }]}
                            name='birthday'
                        >
                            <DatePicker style={{width: '100%'}} />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='身份证号码' en='ID Card No.' required />}
                            rules={[{
                                required: true, 
                                message: '请输入身份证号码', 
                            }]}
                            name='idcard'
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='身份证正面照' en='ID Card Copy' required />}
                            name='idcardFront'
                            className='preview'
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <UploadImg />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='身份证反面照' en='ID Card Copy' required />}
                            name='idcardBack'
                            className='preview'
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <UploadImg />
                        </FormItem>
                    </Col>
                </Row>

                <Row gutter={16} className='mg-t-20'>
                    <Col span={12} xs={24}>
                        <FormItem
                            label={<FormLabel name='职业' en='Occupation' required />}
                            name='profession'
                            rules={[{
                                required: true, 
                                message: '请输入职业', 
                            }]}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='籍贯' en='Native place' required />}
                            name='area'
                            rules={[{
                                required: true, 
                                message: '请选择籍贯', 
                            }]}
                        >
                            <Cascader  options={options} />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='院校名称' en='Educational background' required />}
                            name='school'
                            rules={[{
                                required: true, 
                                message: '请输入院校名称', 
                            }]}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='专业' en='specialty' required />}
                            name='professional'
                            rules={[{
                                required: true, 
                                message: '请输入专业', 
                            }]}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='学历' en='Education background'  />}
                            name='education'
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='工作单位' en='Company'  required />}
                            name='employer'
                            rules={[{
                                required: true, 
                                message: '请输入工作单位', 
                            }]}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='QQ号' en='QQ'  />}
                            name='qq'
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='微信号' en='WeChat'  required/>}
                            name='wechat'
                            rules={[{
                                required: true, 
                                message: '请输入微信号', 
                            }]}
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='邮箱' en='E-mail' required />}
                            name='email'
                            rules={[{
                                required: true, 
                                message: '请输入邮箱', 
                            }]}
                        >
                            <Input />
                        </FormItem>
                    </Col>
                    <Col span={12} xs={24}>
                        <FormItem
                            label={<FormLabel name='职务' en='Postion'  />}
                            name='position'
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='工作经历' en='Work experience'  />}
                            name='workExperience'
                        >
                            <Input.TextArea />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='获奖经历' en='Award experience'  />}
                            name='awardExperience'
                        >
                            <Input />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='通信地址' en='Address' required />}
                            name='Address'
                            rules={[{
                                required: true, 
                                message: '请输入通信地址', 
                            }]}
                        >
                            <Input.TextArea />
                        </FormItem>
                        <FormItem
                            label={<FormLabel name='联系方式' en='Contact' required />}
                            name='contact'
                            rules={[{
                                required: true, 
                                message: '请输入联系方式', 
                            }]}
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
