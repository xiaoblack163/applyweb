import React from 'react'
import { Spin } from 'antd'

const LodingCom: React.FC<any> = ({ children }) => {

    return (
        <Spin spinning={ true }>
            <div style={{height: 800, backgroundColor: '#fff'}}>
                {children}
            </div>
        </Spin>
    )
}

export default LodingCom