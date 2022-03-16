import React from 'react'
import { Form, Input, Row, Col, Radio, Button, DatePicker, Cascader, message, PageHeader, Card, Select, Divider} from 'antd'
import FormLabel from './FormLabel'
import options from 'src/common/city.json'
import AreaJson from 'src/common/area.json'
import UploadImg from './UploadImg'
import { useHistory } from '@friday/router'
import { useApiSelector, useUserInfo } from 'src/hooks'
import { useConfiguration } from '@friday/core'
import { dispatchAsync, useRequest } from '@friday/async'
import { omit, isEmpty, get, pick } from 'lodash'
import cookie from 'js-cookie'
import moment from 'moment'
import DateSelect from './DateSelect'
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

const getBirthday = (str) => {
    const {year, month, day} = str
    return `${year}-${month}-${day}`
}

const transformBirthday = (str='') => {
    const [year, month, day] = str.split('-')
    return {
        year: year ? Number(year) : 2022,
        month: month ? Number(month) : 1,
        day:day ? Number(day) : 1
    }
}


const Index = () => {

    const [form] = Form.useForm()

    const apis = useApiSelector()
    
    const history = useHistory()

    const { publicUrl } = useConfiguration()

    const { dataJson } = useRequest(apis.user.fetchUserInfo({}))

    const { dispatchUserInfo } = useUserInfo()

    React.useEffect(() => {
        if (!isEmpty(dataJson)) {
            const {idcardBack, idcardFront, photo, province, city, county, birthday} = dataJson
            const area = [province, city, county]
            const payload = {
                ...omit(dataJson, ['birthday','idcardBack', 'idcardFront', 'photo']),    
                area,      
                idcardBack: transformUpload(idcardBack, publicUrl.OPEN_IMG_URL),
                idcardFront: transformUpload(idcardFront, publicUrl.OPEN_IMG_URL),
                birthday: transformBirthday(birthday),
                photo: transformUpload(photo, publicUrl.OPEN_IMG_URL),
            }
            console.log(payload, 'payload')
            form.setFieldsValue(payload)
        }
        // 自动保存
        const {complete} = dataJson 
        if (!complete) {
            const values = JSON.parse(cookie.get('info') || '{}')
            if(!isEmpty(values)) {
                form.setFieldsValue({
                    ...values,
                })
            }
        }
    }, [dataJson]) 
    

    const onFinish = async () => {
        const values = await form.validateFields()
        const { birthday, area, idcardBack, idcardFront, photo } = values
        const [province, city, county] = area
        const respone = await dispatchAsync(apis.user.completeInfo({
            ...omit(values, ['birthday', 'area', 'idcardBack', 'idcardFront', 'photo']),
            birthday: getBirthday(birthday),
            province,
            city,
            county,
            idcardBack: getUpload(idcardBack),
            idcardFront: getUpload(idcardFront),
            photo: getUpload(photo)
        })) as any
        if (respone.error) return 
        message.success('更新成功')
        cookie.set('info', '{}')
        dispatchUserInfo(respone.dataJson)
        history.push('/user/info')
    } 

    const onValuesChange = (changedValues, allValues) => {
        cookie.set('info', JSON.stringify(allValues))
    }

    return (
        <div className='m-info'>
            <PageHeader 
                title='完善个人信息'
                ghost={false}
                className='mg-b-10'
                onBack={() => history.goBack()}
            />
            <Card hoverable>
            <Form 
                form={form}
                labelCol={{span: 5}}
                wrapperCol={{span: 14}}
                onFinish={onFinish}
                className='pd-t-20'
                onValuesChange={onValuesChange}
            >
                
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
                <Divider />
                <FormItem
                    label={<FormLabel name='照片' en='Photo' required />}
                    rules={[{
                        required: true, 
                        validator: (_, value) => {
                            if (isEmpty(value)) return Promise.reject('请上传图片');
                            const size = get(value, '[0].originFileObj.size')
                            const sizeM = size/1024/1024
                            if (sizeM > 2) {
                                return Promise.reject('请上传小于2m的图片');
                            }
                            return Promise.resolve();
                        }
                    }]}
                    className='preview'
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    name='photo'
                    
                >
                    <UploadImg tips = '上传格式jpg、png、jpeg，大小不超过2M的1寸免冠照'/>
                </FormItem>
                <Divider />
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
                    label={<FormLabel name='国籍' en='Nation' required />}
                    name='nationality'
                    rules={[{
                        required: true, 
                        message: '请选择国籍', 
                    }]}
                    
                >
                    <Select  showSearch optionFilterProp="children" >
                        {AreaJson.map((item, index) => {
                            return (
                                <Select.OptGroup label={item.name} key={item.name+index}>
                                    {item.children.map((j, k) => {
                                        return <Select.Option  value={j.name} key={j.name+k} > {j.name}</Select.Option>
                                    })}
                                </Select.OptGroup>
                            )
                        })}
                    </Select>
                </FormItem>
                <FormItem
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => ( prevValues.nationality !== currentValues.nationality )}
                >
                    {({ getFieldValue }) => {
                        const open = getFieldValue('nationality')
                        if (open != '中国') return
                        return ( 
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
                        ) 
                    }}
                    
                </FormItem>
                
                <FormItem
                    label={<FormLabel name='院校名称' en='Educational background'  />}
                    name='school'
                    rules={[{
                        required: false, 
                        message: '请输入院校名称', 
                    }]}
                >
                    <Input />
                </FormItem>
                <FormItem
                    label={<FormLabel name='专业' en='specialty'  />}
                    name='professional'
                    rules={[{
                        required: false, 
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
                    label={<FormLabel name='工作单位' en='Company'   />}
                    name='employer'
                    rules={[{
                        required: false, 
                        message: '请输入工作单位', 
                    }]}
                >
                    <Input />
                </FormItem>
                <Divider />   
                <FormItem
                    label={<FormLabel name='QQ号' en='QQ'  />}
                    name='qq'
                >
                    <Input />
                </FormItem>
                <FormItem
                    label={<FormLabel name='微信号' en='WeChat'  />}
                    name='wechat'
                    rules={[{
                        required: false, 
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
                        type: 'email'
                    }]}
                >
                    <Input />
                </FormItem>
                <FormItem
                    label={<FormLabel name='出生年/月/日' en='Birth date' required />}
                    rules={[{
                        required: true, 
                        message: '请选择出生年月日', 
                        validator: (_, value) => {
                            if (isEmpty(value)) return Promise.reject('请选择出生年月日')
                            if (!value.year) return Promise.reject('请选择出生年月日')
                            if (!value.month)return Promise.reject('请选择出生年月日')
                            if (!value.day)return Promise.reject('请选择出生年月日')
                            return Promise.resolve()
                        }
                    }]}
                    name='birthday'
                >
                    {/* <DatePicker style={{width: '100%'}} /> */}
                    <DateSelect />
                </FormItem>
                <FormItem
                    label={<FormLabel name='身份证号' en='ID Card No.' required />}
                    rules={[{
                        required: true, 
                        message: '请输入身份证号', 
                        
                    }]}
                    name='idcard'
                >
                    <Input />
                </FormItem>
                <FormItem
                    label={<FormLabel name='上传身份证' en='ID Card Copy' required  />}
                    className='m-info-card'
                    style={{marginBottom: 0}}
                >
                    <Row>
                    <Col span={12}>
                        <FormItem
                            name='idcardFront'
                            className='preview'
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            style={{marginBottom: 0}}
                            rules={[{
                                required: true, 
                                validator: (_, value) => {
                                    if (isEmpty(value)) return Promise.reject('请上传身份证人像面');
                                    const size = get(value, '[0].originFileObj.size')
                                    const sizeM = size/1024/1024
                                    if (sizeM > 2) {
                                    return Promise.reject('请上传小于2m的图片');
                                    }
                                    return Promise.resolve();
                                }
                            }]}
                        >
                            <UploadImg title='上传身份证人像面'/>
                        </FormItem>
                    </Col>
                    <Col span={12}>
                    <FormItem
                        name='idcardBack'
                        className='preview'
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        style={{marginBottom: 0}}
                        rules={[{
                            required: true, 
                            validator: (_, value) => {
                                if (isEmpty(value)) return Promise.reject('请上传身份证国徽面');
                                const size = get(value, '[0].originFileObj.size')
                                const sizeM = size/1024/1024
                                if (sizeM > 2) {
                                return Promise.reject('请上传小于2m的图片');
                                }
                                return Promise.resolve();
                            }
                        }]}
                    >
                        <UploadImg  title='上传身份证国徽面' />
                    </FormItem>
                    </Col>
                    </Row>
                    <div style={{ fontSize: '10px', color: '#999', marginTop: 10 }} >上传格式jpg、png、jpeg，大小不超过2M</div>
                </FormItem>
              
               
                <Divider />
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
                    <Input.TextArea rows={5}  />
                </FormItem>
                <FormItem
                    label={<FormLabel name='获奖经历' en='Award experience'  />}
                    name='awardExperience'
                >
                    <Input />
                </FormItem>
                <FormItem
                    label={<FormLabel name='通信地址' en='Address' required />}
                    name='address'
                    rules={[{
                        required: true, 
                        message: '请输入通信地址', 
                    }]}
                >
                    <Input.TextArea  rows={5}  />
                </FormItem>
                <FormItem
                    label={<FormLabel name='联系方式' en='Contact' required />}
                    name='contact'
                    rules={[{
                        required: true, 
                        message: '请输入联系方式', 
                        pattern: /^1[3456789]\d{9}$/
                    }]}
                >
                    <Input />
                </FormItem>
                  
                <div className='tc' style={{width: '300px', margin: '0 auto'}}>
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
