import React, { Suspense } from 'react' 
import { Route, useScrollTop, useRouteMatch } from '@friday/router'

import BaseLayout from './BaseLayout'
import List from '../list'


const PrimaryRoutes = () => {
    const match = useRouteMatch()
    useScrollTop()
    return (
        <BaseLayout>
            <Route path={`${match.path}/list`} component={List} />
        </BaseLayout>
    )
}

export default PrimaryRoutes