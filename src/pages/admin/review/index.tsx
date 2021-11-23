import React  from "react";
import { Input, Alert, Descriptions, Form, Button, Row, Col, message, Image} from 'antd'
import { useApiSelector } from 'src/hooks'
import { useParams, useHistory } from '@friday/router'
import { dispatchAsync, useRequest } from '@friday/async'
import { isEmpty, get } from 'lodash'
import { useConfiguration } from '@friday/core'

const FormItem = Form.Item

const Index = () => {

    const apis = useApiSelector()

    const [ form ] = Form.useForm()

    const { id } = useParams() as any

    const { publicUrl } = useConfiguration()

    const { dataJson } = useRequest(apis.admin.reviewDetail({id}))

    const history = useHistory()

    React.useEffect(() => {
        if (!isEmpty(dataJson)) {
            form.setFieldsValue(dataJson)
        }
    }, [dataJson])


    const onFinish = async (type) => {
        const values = await form.validateFields()

        const respone = await dispatchAsync(apis.admin.saveOrUpdate({
            ...values,
            signupId: id,
            save: type
        })) as any
        
        if (respone.error) return 
        message.success('保存成功')
        history.goBack()
    }

    const imgList = eval(get(dataJson, 'productPics')) || []
    

    return (
        <div>
            <h4 className='m-head'>作品评分</h4>
            <Alert message= '参赛作品信息' />
            <Descriptions bordered  className='mg-t-20 mg-b-20' layout="vertical">
                <Descriptions.Item label="作品编号">{get(dataJson, 'id')}</Descriptions.Item>
                <Descriptions.Item label="参赛类别">{get(dataJson, 'entryDirection')}</Descriptions.Item>
                <Descriptions.Item label="参赛方向">{get(dataJson, 'productType')}</Descriptions.Item>
                <Descriptions.Item label="作品名称(中文)">{get(dataJson, 'productName')}</Descriptions.Item>
                <Descriptions.Item label="作品名称(英文)" >
                    {get(dataJson, 'productNameEn') || '--'}
                </Descriptions.Item>
                <Descriptions.Item label="推荐人">
                    {get(dataJson, 'recommendName') || '--'}
                </Descriptions.Item>
                <Descriptions.Item label="作品图片" span={3}>
                    <Image.PreviewGroup>
                        {imgList.map(item => {
                            return (
                                <Image
                                    width={200}
                                    key={item}
                                    src={publicUrl.OPEN_IMG_URL + item}
                                />
                            )
                        })}
                    </Image.PreviewGroup>
                </Descriptions.Item>
                <Descriptions.Item label="作品视频" span={3}>

                </Descriptions.Item>
                <Descriptions.Item label="设计主题及作品说明(中文)" span={3}>
                    {get(dataJson, 'productDesc') || '--'}
                </Descriptions.Item>
                <Descriptions.Item label="设计主题及作品说明(英文)" span={3}>
                    {get(dataJson, 'productDescEn') || '--'}
                </Descriptions.Item>
                
            </Descriptions>

            <Alert message= '评分' />

            <Form
                form={form}
                labelCol={{
                    xs:8,
                    md:6
                }}
                wrapperCol={{
                    xs: 12,
                    md: 12
                }}
                className='mg-t-30'
            >
                <FormItem
                    label={'原创性20%'}
                    rules={[{required: true, message: '请评分1-20'}]}
                    name='itemA'
                >
                    <Input placeholder='请评分1-20' max={20} min={1}  />
                </FormItem>

                <FormItem
                    label={'创新性20%'}
                    rules={[{required: true, message: '请评分1-20'}]}
                    name='itemB'
                >
                    <Input placeholder='请评分1-20' max={20} min={1}  />
                </FormItem>

                <FormItem
                    label={'美观性20%'}
                    rules={[{required: true, message: '请评分1-20'}]}
                    name='itemC'
                >
                    <Input placeholder='请评分1-20' max={20} min={1}  />
                </FormItem>

                <FormItem
                    label={'系列性15%'}
                    rules={[{required: true, message: '请评分1-15'}]}
                    name='itemD'
                >
                    <Input placeholder='请评分1-15' max={15} min={1}  />
                </FormItem>

                <FormItem
                    label={'工业性15%'}
                    rules={[{required: true, message: '请评分1-15'}]}
                    name='itemE'
                >
                    <Input placeholder='请评分1-15' max={15} min={1}  />
                </FormItem>

                <FormItem
                    label={'商业价值10%'}
                    rules={[{required: true, message: '请评分1-10'}]}
                    name='itemF'
                >
                    <Input placeholder='请评分1-20' max={10} min={1}  />
                </FormItem>
                <FormItem
                    noStyle
                    shouldUpdate={true}
                >
                    {({ getFieldsValue }) => {
                        const values = Object.values(getFieldsValue()).filter(item => item) as any
                        const sum = values.reduce((pre, cur) => {
                            pre = Number(pre) + Number(cur)
                            return pre
                        }, 0)
                        return(
                            <Form.Item
                                label={'总分数'}
                            >
                                <div style={{color: 'red', fontSize: '20px'}}>
                                    {sum}
                                </div>    
                            </Form.Item>
                        ) 
                    }}
                </FormItem>
                <div className='tc' style={{width: '328px', margin: '0 auto'}}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button
                                size='middle'
                                onClick={() => onFinish(0)}
                                block
                            >
                                保存
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size='middle'
                                onClick={() => onFinish(1)}
                                block
                            >
                                提交
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Form>

            
        </div>
    )
}

export default Index