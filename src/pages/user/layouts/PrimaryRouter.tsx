import React, { Suspense } from 'react' 
import { Route, useScrollTop, useRouteMatch } from '@friday/router'

import BaseLayout from './BaseLayout'
import Info from '../info'
import ProductList from '../product'
import ProductAdd from '../product/AddProduct'
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
            <Route path={`${match.path}/product`} exact component={ProductList} />
            <Route path={`${match.path}/product/add`} component={ProductAdd} />
            <Route path={`${match.path}/product/edit/:id`} component={ProductAdd} />
        </BaseLayout>
    )
}

export default PrimaryRoutes