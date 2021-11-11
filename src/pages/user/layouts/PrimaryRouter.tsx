import React, { Suspense } from 'react' 
import { Route, useScrollTop, useRouteMatch } from '@friday/router'

import BaseLayout from './BaseLayout'
import Info from '../info'


const PrimaryRoutes = () => {
    const match = useRouteMatch()
    useScrollTop()
    return (
        <BaseLayout>
            <Route path={`${match.path}/info`} component={Info} />
        </BaseLayout>
    )
}

export default PrimaryRoutes