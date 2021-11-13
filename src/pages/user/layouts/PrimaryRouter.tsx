import React, { Suspense } from 'react' 
import { Route, useScrollTop, useRouteMatch } from '@friday/router'

import BaseLayout from './BaseLayout'
import Info from '../info'
import ProductList from '../product/List'
import ProductAdd from '../product'
import PassWord from '../Password'


const PrimaryRoutes = () => {
    const match = useRouteMatch()
    useScrollTop()
    return (
        <BaseLayout>
            <Route path={`${match.path}/password`} component={PassWord} />
            <Route path={`${match.path}/info`} component={Info} />
            <Route path={`${match.path}/product`} exact component={ProductAdd} />
            <Route path={`${match.path}/product/list`} component={ProductList} />
        </BaseLayout>
    )
}

export default PrimaryRoutes