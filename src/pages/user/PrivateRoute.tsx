import React, { useCallback } from 'react'
import { Redirect, Route, RouteComponentProps } from '@friday/router'
import TokenServeice from 'src/services/tokenService'
import useUserInfo from './hooks/useUserInfo'
import LodingCom from 'src/pages/layouts/LodingCom'
import { isEmpty } from 'lodash'

const PrimaryLayout: React.FC<any> = ({ children, ...rest}) => {

    const { userInfo, fetchUserInfo } = useUserInfo()
    const renderFn = useCallback((renderProps: RouteComponentProps<any>) => {
        
        const { component: Component } = rest

        if (!TokenServeice.isAuthenticated()) {
            return (
                <Redirect
                    to={`/user/login?path=${location.pathname}`}
                />
            )
        }
        if (!isEmpty(userInfo)) {
           
            if (!Component) {
                return null
            }
            return <Component {...renderProps} />
        }
        
        fetchUserInfo()
        return (<LodingCom />)
        // return <Component {...renderProps} />
    }, [ userInfo ])
    
    return (
        <Route {...rest} component={renderFn} />
    )
}

export default PrimaryLayout