import React  from "react";
import { Form, Input, Row, Col, Radio, Button, DatePicker, Cascader, message, PageHeader, Card} from 'antd'
import { useApiSelector } from 'src/hooks'
import { dispatchAsync, useRequest } from '@friday/async'
import { useHistory, useParams } from '@friday/router'
import UploadImg from './UploadImg'
import UploadVideo from './UploadVideo'
import { isEmpty, get } from 'lodash'
import { useConfiguration } from '@friday/core'


const FormItem = Form.Item

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList
}

const getUpload = (uploadResponse) => {
    // 没图片
    if (isEmpty(uploadResponse)) return ''
    return uploadResponse.map(item => {
        return get(item, 'response.filePath') || ''
    })
}   

const transformUpload = (path=[], prefix) => {
    if (isEmpty(path)) return ''
    return path.map(item => {
        return {
            response: {
                data: {
                    path: item
                },
                filePath: item
            },
            status: "done",
            thumbUrl: prefix + item
        }
    })
}


const Index = () => {
    const apis = useApiSelector()

    const [ form ] = Form.useForm()

    const { id = 0 } = useParams() as any

    const { dataJson } = useRequest(id ? apis.user.productInfo({id}): null)

    const { publicUrl } = useConfiguration()

    React.useEffect(() => {
        if (!isEmpty(dataJson)) {
            const {productPics, productVideos} = dataJson
            console.log(typeof productPics)
            const payload = {
                ...dataJson,
                productPics: transformUpload(JSON.parse(productPics), publicUrl.OPEN_IMG_URL),
                productVideos: transformUpload(JSON.parse(productVideos), publicUrl.OPEN_IMG_URL),
            }
            form.setFieldsValue(payload)
        }
    }, [dataJson])

    const history = useHistory()

    

    const onFinish = async () => {
        const values = await form.validateFields()
        const {productPics, productVideos} = values
        const respone = await dispatchAsync(apis.user.addProduct({
            ...values,
            productPics: JSON.stringify(getUpload(productPics)),
            productVideos: JSON.stringify(getUpload(productVideos)),
            id
        })) as any
        
        if (respone.error) return 
        message.success(id ? '编辑成功':'添加成功')
        history.goBack()
    }

    return (
        <div>
            <PageHeader 
                title={id ? '编辑作品': '添加作品'}
                ghost={false}
                className='mg-b-10'
                onBack={() => history.goBack()}
            />
            <Card hoverable>
            <Form 
                form={form}
                labelCol={{
                    xs:24,
                    md:6
                }}
                wrapperCol={{
                    xs: 24,
                    md: 14
                }}
                onFinish={onFinish}
            >
                <FormItem
                    label={'参赛类别'}
                    rules={[{required: true, message: '请选择参赛类别'}]}
                    name='productType'
                    className='pd-t-20'
                >
                    <Radio.Group>
                        <Radio value={'个人组'}>个人组</Radio>
                        <Radio value={'团体组'}>团体组</Radio>
                        <Radio value={'企业组'}>企业组</Radio>
                    </Radio.Group>
                </FormItem>

                <FormItem
                    label={'参赛方向'}
                    rules={[{required: true, message: '请选择参赛方向'}]}
                    name='entryDirection'
                >
                    <Radio.Group>
                        <Radio value={'系列服装类'}>系列服装类</Radio>
                        <Radio value={'经典套装类'}>经典套装类</Radio>
                        <Radio value={'毛衫文化品牌类'}>毛衫文化品牌类</Radio>
                    </Radio.Group>
                </FormItem>

             
                <FormItem
                    label={'作品名称(中文)'}
                    rules={[{required: true, message: '请输入作品名称(中文)'}]}
                    name='productName'
                >
                    <Input placeholder='请输入作品名称(中文)' />
                </FormItem>
                <FormItem
                    label={'作品名称(英文)'}
                    rules={[{required: true, message: '请输入作品名称(英文)'}]}
                    name='productNameEn'
                >
                    <Input placeholder='请输入作品名称(英文)' />
                </FormItem>
                <FormItem
                    label={'指导教师'}
                    rules={[{required: false, message: '请输入指导教师'}]}
                    name='recommendName'
                >
                    <Input placeholder='请输入指导教师' />
                </FormItem>

                <FormItem
                    label={'作品图片'}
                    rules={[{required: true,
                        validator: (_, value) => {
                            if (isEmpty(value)) return Promise.reject('请上传作品图片');
                            let isCheckSize = false
                            value.some(item => {
                                const size = get(item, 'originFileObj.size')
                                const sizeM = size/1024/1024
                                if (sizeM > 2) {
                                    isCheckSize = true
                                    return true
                                }
                            })
                            if (isCheckSize) {
                                return Promise.reject('请上传小于2m的图片');
                            }
                            return Promise.resolve();
                        }}
                    ]}
                    name='productPics'
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <UploadImg title='上传图片' tips='上传格式jpg、png、jpeg，大小不超过2M，A3尺寸，分辨率300dpi，一套作品2-3张图片' />
                </FormItem>
                <FormItem
                    label={'作品视频'}
                    rules={[{required: false, validator: (_, value) => {
                        if (isEmpty(value)) return Promise.reject('请上传作品视频');
                        let isCheckSize = false
                        value.some(item => {
                            const size = get(item, 'originFileObj.size')
                            const sizeM = size/1024/1024
                            if (sizeM > 10) {
                                isCheckSize = true
                                return true
                            }
                        })
                        if (isCheckSize) {
                            return Promise.reject('请上传小于10m的视频');
                        }
                        return Promise.resolve();
                    }}]}
                    name='productVideos'
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <UploadVideo title='上传视频' tips='请上传小于10m的视频' />
                </FormItem>
                <FormItem
                    label={'设计主题及作品说明(中文)'}
                    rules={[{required: false, message: '请输入设计主题及作品说明(中文)'}]}
                    name='productDesc'
                >
                   围绕作品的创作灵感，分别阐述作品的原创性、文化特征、数字化设计、工艺特点、市场竞争力（每条不超过150字）
                </FormItem>
                <FormItem
                    label={'原创性'}
                    rules={[{required: true, message: '请输入原创性', max: 150}]}
                    name='explainA'
                >
                    <Input.TextArea placeholder='请输入原创性' rows={3} />
                </FormItem>
                <FormItem
                    label={'文化特性'}
                    rules={[{required: true, message: '请输入文化特性', max: 150}]}
                    name='explainB'
                >
                    <Input.TextArea placeholder='请输入文化特性' rows={3} />
                </FormItem>
                <FormItem
                    label={'数字化设计'}
                    rules={[{required: true, message: '请输入数字化设计', max: 150}]}
                    name='explainC'
                >
                    <Input.TextArea placeholder='请输入数字化设计' rows={3}/>
                </FormItem>
                <FormItem
                    label={'工艺特点'}
                    rules={[{required: true, message: '请输入工艺特点', max: 150}]}
                    name='explainD'
                >
                    <Input.TextArea placeholder='请输入工艺特点' rows={3}/>
                </FormItem>
                <FormItem
                    label={'市场竞争力'}
                    rules={[{required: true, message: '请输入市场竞争力', max: 150}]}
                    name='explainE'
                >
                    <Input.TextArea placeholder='请输入市场竞争力' rows={3} />
                </FormItem>
                <FormItem
                    label={'设计主题及作品说明(英文)'}
                    rules={[{required: false, message: '请输入设计主题及作品说明(英文)'}]}
                    name='productDescEn'
                >
                    <Input.TextArea placeholder='请输入设计主题及作品说明(英文)' rows={5} />
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