import React from 'react'


const Index = (props) => {
    const {name, en , required} = props
    return (
        <div style={{position: 'relative'}}> 
            <span className='red' style={{fontFamily: 'SimSun, sans-serif'}}>{required ? '*' : ''}</span> {name} 
            <div style={{ fontSize: '10px', color: '#999'}}>{en}</div>
        </div>
    )
}

export default Index