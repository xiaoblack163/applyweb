import React, { useState } from 'react'
import { Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
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
        accept: 'image/jpeg,image/png,image/jpg',
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
                    listType="picture-card"
                    className="m-avatar-uploader"
                    {...uploadprops}
                >
                    
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>{title}</div>
                    </div>
                </Upload>
            </div>
            <div style={{ fontSize: '10px', color: '#999', marginTop: 10 }} >{tips}</div>
        </div>
    )
}

export default Qrcode