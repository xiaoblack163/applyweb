/*
 * @Author: your name
 * @Date: 2021-12-31 15:23:26
 * @LastEditTime: 2021-12-31 16:40:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /applyweb/src/pages/user/info/DateSelect.tsx
 */

import React, { useMemo } from 'react'
import { Select, Row, Col } from 'antd'
import { useImmer } from '@friday/immer'
import { range } from 'lodash'
import moment from 'moment'

const getYears = () => {
    const maxYear = 2023
    const years: number[] = []
    for(var i = 1960;i< maxYear; i++) {
        years.push(i)
    }
    return years
}

const years = getYears()

const month = range(12).map(item => item+1)


const Index = ( props ) => {

    const { value={}, onChange} = props

    const [state, setState] = useImmer({
        year: 2022,
        month: 1,
        day: 1
    })

    const onSelectChange = (type, val) => {
        setState(draft => {
            draft[type] = val
        })
        onChange && onChange({
            ...value,
            [type]: val
        })
        
    }

    const daysOption = useMemo(() => {
        let days  = 31
        if (state.year && state.month) {
            days = moment().year(state.year).month(state.month-1).date()
        }
        return range(days).map(item => item +1)
    }, [state.year, state.month])

    return (
        <>
            <Row gutter={10}>

           <Col md={8} xs={8}>
            <Select value={value.year || state.year}  onChange={(e)=>onSelectChange('year', e)} placeholder='年' allowClear>
                {years.map((item, key) => {
                    return (
                        <Select.Option value={item} key={key}>
                            {item}年 
                        </Select.Option>
                    )
                })}
            </Select> 
            </Col>
            <Col md={8} xs={8}>
            <Select value={value.month || state.month}  onChange={(e)=>onSelectChange('month', e)} placeholder='月' allowClear>
                {month.map((item, key) => {
                    return (
                        <Select.Option value={item} key={key}>
                            {item}月
                        </Select.Option>
                    )
                })}
            </Select> 
            </Col>
            <Col md={8} xs={8}>
            <Select value={value.day || state.day}  onChange={(e)=>onSelectChange('day', e)}
                placeholder='日' allowClear
            >
                {daysOption.map((item, key) => {
                    return (
                        <Select.Option value={item} key={key}>
                            {item}日
                        </Select.Option>
                    )
                })}
            </Select> 
            </Col>
            </Row>
        </>
    )
}

export default Index