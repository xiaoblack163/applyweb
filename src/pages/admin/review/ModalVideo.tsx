import React, {useState} from 'react'
import { Button } from 'antd'
import ModalVideo from 'react-modal-video'


const Index = (props) => {
    const { title, url} = props
    const [isOpen, setOpen] = useState(false)

    return (
        <React.Fragment>
            <ModalVideo channel='custom' autoplay isOpen={isOpen} url={url} onClose={() => setOpen(false)} />
            <Button type='primary' onClick={()=> setOpen(true)} >{title}</Button>
        </React.Fragment>
    )
}

export default Index