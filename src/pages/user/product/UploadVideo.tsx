/*
 * @Author: your name
 * @Date: 2021-11-24 00:32:57
 * @LastEditTime: 2021-12-31 14:56:26
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /applyweb/src/pages/user/product/UploadVideo.tsx
 */
import React, { useState } from 'react'
import { Upload, Button } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useConfiguration } from '@friday/core'
import tokenInstance from 'src/services/tokenService'
import { get } from 'lodash'

const Qrcode = (props) => {

    const { fileList = [], onChange, tips = '上传格式jpg、png、jpeg，大小不超过2M', title='上传图片'  } = props

    const [uploadFileList, setUploadFilelist] = useState<any[]>([])

    const { publicUrl } = useConfiguration()

    const triggerChange = changedValue => {
        if (onChange) {
            onChange({ uploadFileList, ...fileList, ...changedValue })
        }
    }

    const onUploadChange = ({ fileList }) => {
        setUploadFilelist(fileList)
        triggerChange({ fileList })
    }

    const fileLists = fileList || uploadFileList

    const uploadprops = {
        name: 'picFile',
        action: publicUrl.OPEN_API_URL + '/file/upload',
        accept: 'video/mp4, video/AVI',
        headers: {
            token: tokenInstance.get() as string
        },
        onChange: onUploadChange,
        fileList: fileLists,
    }


    return (
        <div>
            <div className='clearfix'>
                <Upload
                    listType='picture'
                    className="m-avatar-uploader"
                    {...uploadprops}
                >
                    
                    <Button icon={<UploadOutlined />}>{title}</Button>
                </Upload>
            </div>
            <div style={{ fontSize: '10px', color: '#999', marginTop: 10 }} >{tips}</div>
        </div>
    )
}

export default Qrcode