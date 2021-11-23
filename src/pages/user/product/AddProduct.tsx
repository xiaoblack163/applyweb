import React  from "react";
import { Form, Input, Row, Col, Radio, Button, DatePicker, Cascader, message} from 'antd'
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

    const {dataJson} = useRequest(id ? apis.user.productList({}): null)

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
            <h4 className='m-head'>添加作品</h4>
            <Form 
                form={form}
                labelCol={{
                    xs:24,
                    md:6
                }}
                wrapperCol={{
                    xs: 24,
                    md: 12
                }}
                onFinish={onFinish}
            >
                <FormItem
                    label={'参赛类别'}
                    rules={[{required: true, message: '请选择参赛类别'}]}
                    name='productType'
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
                    label={'推荐人'}
                    rules={[{required: true, message: '请输入推荐人'}]}
                    name='recommendName'
                >
                    <Input placeholder='请输入推荐人' />
                </FormItem>

                <FormItem
                    label={'作品图片'}
                    rules={[{required: true, message: '请上传作品图片'}]}
                    name='productPics'
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <UploadImg title='上传图片' />
                </FormItem>
                <FormItem
                    label={'作品视频'}
                    rules={[{required: true, message: '请上传作品视频'}]}
                    name='productVideos'
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <UploadVideo title='上传视频' tips='' />
                </FormItem>
                <FormItem
                    label={'设计主题及作品说明(中文)'}
                    rules={[{required: true, message: '请输入设计主题及作品说明(中文)'}]}
                    name='productDesc'
                >
                    <Input.TextArea placeholder='请输入设计主题及作品说明(中文)' />
                </FormItem>
                <FormItem
                    label={'设计主题及作品说明(英文)'}
                    rules={[{required: true, message: '请输入设计主题及作品说明(英文)'}]}
                    name='productDescEn'
                >
                    <Input.TextArea placeholder='请输入设计主题及作品说明(英文)' />
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

        </div>
    )
}

export default Index