import React from 'react'
import { Spin } from 'antd'

const LodingCom: React.FC<any> = ({ children }) => {

    return (
        <Spin spinning={ true } tip='加载中, 请稍等...'>
            <div style={{height: '100vh', backgroundColor: '#fff'}}>
                {children}
            </div>
        </Spin>
    )
}

export default LodingCom