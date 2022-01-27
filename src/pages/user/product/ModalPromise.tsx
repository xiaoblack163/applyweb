/*
 * @Author: baishijie
 * @Date: 2022-01-27 14:40:10
 * @LastEditors: baishijie
 * @LastEditTime: 2022-01-27 15:34:50
 * @FilePath: /applyweb/src/pages/user/product/ModalPromise.tsx
 */

import React from 'react'
import { Modal, Button, Checkbox, Space} from 'antd'
import './style.less'

const Index = (props) => {

    const {visible, onClose} = props

    const [check, setCheck] = React.useState(false)
    const [buttonCheck, setButtonCheck] =  React.useState(false)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        setTimeout(() => {
          if (count > 0) {
            setCount((c: number) => c - 1);
          }
        }, 1000);
    }, [count])

    const onFinsh = ()=> {
        console.log(1111)
        onClose(true)
    }
 

    return (
        <Modal
            visible={visible}
            footer={null}
            bodyStyle={{
                maxWidth: '800px',
            }}
        >
            <div className='add_promise'>
                <h3>原创承诺书</h3>
                <p>致首届2022“洪合杯”毛衫设计大赛组织委员会：</p>

                <p className='p1'>本人已详细阅读首届2022“洪合杯”毛衫设计大赛征集启事，愿意遵守相关规定，并承诺如下：</p>
                <p className='p1'>1、本人提交的设计作品为原创设计，本人保证对参赛作品拥有充分、完全、排他的知识产权，不侵犯任何他人的任何专利、著作权、商标权及其他知识产权。</p>
                <p  className='p1'>2、若因本人提交的设计作品产生的知识产权纠纷或争议，一切法律责任由本人负责，与“洪合杯”毛衫设计大赛组织委员会及相关主办、协办单位无关。</p>
                <p  className='p1'>3、本人同意该作品可由“洪合杯” 毛衫设计大赛组织委员会公开展示、展览、出版、推广宣传和在有关媒体进行报道。</p>
                <p  className='p1'>4、若在赛后发现参赛作品知识产权、商业秘密或技术秘密等归属不明晰或承诺人弄虚作假、被投诉等情况，承诺人自愿根据实际情况由“洪合杯”毛衫设计大赛组织委员会决定是否取消参赛资格、取消获奖荣誉、退还奖金。</p>
                <p  className='p2'>特此承诺。</p>
                <p  className='p3'>*本承诺书真实可靠，承诺人自愿签订并严格、善意履行本承诺书，其中承诺事项自承诺书生效时即对各承诺人产生法律约束力，本承诺书为不可撤销承诺书，承诺人无权撤回本承诺书中的各项承诺事项。</p>
                <div><Checkbox checked={check} onChange={() => {
                    setCheck(!check); 
                    if (!check) setCount(5)
                }} /> 声明：承诺人自愿签订并严格、善意履行本承诺书，其中承诺事项自承诺书即时生效。</div>
                <Space style={{width: '100%', justifyContent: 'center'}} wrap >
                    <Button type={buttonCheck ? 'primary': 'default'} disabled={count>0 || !check} onClick={() => setButtonCheck(!buttonCheck)}>{count == 0 ? '': `请等待${count}s点击` }我同意</Button>
                    <Button type='primary' disabled={!check || !buttonCheck} onClick={onFinsh}>下一步</Button>
                </Space>
            </div>
        </Modal >
    )
}

export default Index