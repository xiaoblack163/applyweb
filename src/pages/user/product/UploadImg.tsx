/*
 * @Author: your name
 * @Date: 2021-11-22 10:39:54
 * @LastEditTime: 2021-12-31 14:57:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /applyweb/src/pages/user/product/UploadImg.tsx
 */
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
                    {fileList.length > 3 ? null :
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>{title}</div>
                        </div>
                    }
                </Upload>
            </div>
            <div style={{ fontSize: '10px', color: '#999', marginTop: 10 }} >{tips}</div>
        </div>
    )
}

export default Qrcode