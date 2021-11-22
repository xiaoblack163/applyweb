import React, { Suspense } from 'react' 
import { Route, useScrollTop, useRouteMatch } from '@friday/router'

import BaseLayout from './BaseLayout'
import ReviewHas from '../review/has'
import ReviewTreat from '../review/treat'

import ManageHas from '../manage/has'
import ManageTreat from '../manage/treat'

import Review from '../review/index'

const PrimaryRoutes = () => {
    const match = useRouteMatch()
    useScrollTop()
    console.log(`${match.path}/reviewhas`)
    return (
        <BaseLayout>
            <Route path={`${match.path}/reviewhas`} exact component={ReviewHas} />
            <Route path={`${match.path}/reviewtreat`} exact  component={ReviewTreat} />
            <Route path={`${match.path}/review/:id/:type`} exact component={Review} />
            <Route path={`${match.path}/managehas`} component={ManageHas} />
            <Route path={`${match.path}/managetreat`} component={ManageTreat} />
        </BaseLayout>
    )
}

export default PrimaryRoutes