import React, { useRef }  from "react";
import { Input, Alert, Descriptions, Form, Button, Row, Col, message, Image, Space, PageHeader, Card} from 'antd'
import { useApiSelector } from 'src/hooks'
import { useParams, useHistory } from '@friday/router'
import { dispatchAsync, useRequest } from '@friday/async'
import { isEmpty, get, isNumber, pick, omit,random } from 'lodash'
import { useConfiguration } from '@friday/core'
import ModalVideo from '../../admin/review/ModalVideo'
import '../../admin/review/style.less'
import DownloadService from 'src/services/downloadService'
import html2canvas from 'html2canvas'


const FormItem = Form.Item


export const downloadWithLink = async (href: string, name?: string) => {
    const saveLink = document.createElement('a')
    saveLink.href = href
    if (name) {
      saveLink.download = name
    }
  
    await saveLink.click()
  }
  
  
  export const downloadDataUrl = (dataUrl: string, name?: string) => {
    
    const arr = dataUrl.split(',') as any
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    
    while(n--){
      u8arr[n] = bstr.charCodeAt(n)
    }
    
    const blob = new Blob([u8arr], { type: mime })
    const objUrl = URL.createObjectURL(blob)
  
    downloadWithLink(objUrl, name)
  }


const Index = () => {

    const apis = useApiSelector()

    const [ form ] = Form.useForm()

    const { id } = useParams() as any

    const { publicUrl } = useConfiguration()

    const { dataJson } = useRequest(apis.admin.reviewDetail({id}))

    const refImg = useRef() as any

    const history = useHistory()

    React.useEffect(() => {
        if (!isEmpty(dataJson)) {
            form.setFieldsValue(dataJson)
        }
    }, [dataJson])

    const imgList = eval(get(dataJson, 'productPics')) || []

    const videoList = eval(get(dataJson, 'productVideos')) || []

    function downloadFile(content, fileName) { //下载base64图片
        var base64ToBlob = function(code) {
            let parts = code.split(';base64,');
            let contentType = parts[0].split(':')[1];
            console.log(parts, 'parts[1]')
            let raw = window.atob(parts[1]);
            let rawLength = raw.length;
            let uInt8Array = new Uint8Array(rawLength);
            for(let i = 0; i < rawLength; ++i) {
                uInt8Array[i] = raw.charCodeAt(i);
            }
            return new Blob([uInt8Array], {
                type: contentType
            });
        };
        let aLink = document.createElement('a');
        let blob = base64ToBlob(content); //new Blob([content]);
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
    }

    const screenshotToPng = async (name?: string) => {
        // return new Promise((resolve, reject) => {
        //   html2canvas(refImg.current, { useCORS: true, allowTaint: true  }).then(async canvas => {
        //     const imgUri = canvas.toDataURL('png', 4)
        //     downloadDataUrl(imgUri, name + '.png')
        //     resolve(0)
        //   })
        // })
        const { data } = await dispatchAsync(apis.admin.singleToimg({id: id}))
        downloadFile(data, `${name}.png`)
        message.success('导出成功')
      }
    
    return (
        <div>
            <PageHeader 
                title='作品详情'
                ghost={false}
                onBack={() => history.goBack()}
            />
            <Card hoverable bodyStyle={{padding: 0}}>
            <div id='toImg' style={{width: '800px', margin: '20px auto'}} ref={refImg}>
                <Alert message= '参赛作品信息' className="m-fix-alert" banner  showIcon={false} />
                <Descriptions bordered  className='mg-b-20' layout="vertical" size={'small'}>
                    <Descriptions.Item label="作品编号">{get(dataJson, 'id')}</Descriptions.Item>
                    <Descriptions.Item label="参赛方向">{get(dataJson, 'entryDirection')}</Descriptions.Item>
                    <Descriptions.Item label="参赛类别">{get(dataJson, 'productType')}</Descriptions.Item>
                    <Descriptions.Item label="作品名称(中文)">{get(dataJson, 'productName')}</Descriptions.Item>
                    <Descriptions.Item label="作品名称(英文)" >
                        {get(dataJson, 'productNameEn') || '--'}
                    </Descriptions.Item>
                    <Descriptions.Item label="推荐人">
                        {get(dataJson, 'recommendName') || '--'}
                    </Descriptions.Item>
                    <Descriptions.Item label="作品图片" span={3}>
                        <div className="m-details">
                            {imgList.map((item, index) => {
                                return (
                                    <>
                                        <img
                                            width={300}
                                            key={index}
                                            src={`${publicUrl.OPEN_IMG_URL + item}`}
                                            // src={`http://0.0.0.0:9005/server/transferImage?path=${publicUrl.OPEN_IMG_URL + item}`}
                                            // crossOrigin='anonymous'
                                        />
                                    </>
                                )
                            })}
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="设计主题及作品说明(中文)" span={3}>
                        {/* {get(dataJson, 'productDesc') || '--'} */}
                        <div>
                            <span style={{color: '#666'}}>原创性与创新性:</span> {get(dataJson, 'explainA') || '--'}
                        </div>
                        <div>
                            <span style={{color: '#666'}}>美观性:</span> {get(dataJson, 'explainB') || '--'}
                        </div>
                        <div>
                            <span style={{color: '#666'}}>系列性:</span> {get(dataJson, 'explainC') || '--'}
                        </div>
                        <div>
                            <span style={{color: '#666'}}>工艺性:</span> {get(dataJson, 'explainD') || '--'}
                        </div>
                        <div>
                            <span style={{color: '#666'}}>商业价值:</span> {get(dataJson, 'explainE') || '--'}
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item label="评分总分" span={3}>
                        {get(dataJson, 'sum') || '--'}
                    </Descriptions.Item>
                </Descriptions>
               </div>
               <div style={{margin: '20px', textAlign: 'center'}}>
                <Button onClick={() => screenshotToPng(get(dataJson, 'productName'))} type='primary'>导出图片</Button>
               </div>
            </Card>
        </div>
    )
}

export default Index