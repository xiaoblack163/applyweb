/*
 * @Author: your name
 * @Date: 2021-12-31 14:16:06
 * @LastEditTime: 2021-12-31 14:41:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /applyweb/src/pages/user/product/ImgPreview.tsx
 */

import React, { useState } from 'react'
import { Image } from 'antd'
import { useConfiguration } from '@friday/core'


const Index = (props) => {

    const { list, url } = props

    const { publicUrl } = useConfiguration()

    const prefix = publicUrl.OPEN_IMG_URL

    const [visible, setVisible] = useState(false)

    return (
        <>
            <div className='m-img-thumbs'>
                <img src={url} onClick={() => setVisible(true)} />
            </div>
            <div style={{ display: 'none' }}>
                <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                    {list.map((item, index) => {
                        return (
                            <Image src={prefix+item} key={index} />
                        )
                    })}
                </Image.PreviewGroup>
            </div>
        </>

    )
}

export default Index