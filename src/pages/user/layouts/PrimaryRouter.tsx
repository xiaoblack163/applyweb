import React, { Suspense } from 'react' 
import { Route, useScrollTop, useRouteMatch } from '@friday/router'

import BaseLayout from './BaseLayout'
import Info from '../info'
import ProductList from '../product/List'
import ProductAdd from '../product'
import PassWord from '../Password'
import EditInfo from '../info/EditInfo'


const PrimaryRoutes = () => {
    const match = useRouteMatch()
    useScrollTop()
    return (
        <BaseLayout>
            <Route path={`${match.path}/password`} component={PassWord} />
            <Route path={`${match.path}/info`} exact component={Info} />
            <Route path={`${match.path}/info/edit`} exact component={EditInfo} />
            <Route path={`${match.path}/product`} exact component={ProductAdd} />
            <Route path={`${match.path}/product/list`} component={ProductList} />
        </BaseLayout>
    )
}

export default PrimaryRoutes