import React, { Suspense } from 'react' 
import { Route, useScrollTop, useRouteMatch } from '@friday/router'

import BaseLayout from './BaseLayout'
import ReviewHas from '../review/has'
import ReviewTreat from '../review/treat'

import ManageHas from '../manage/has'
import ManageTreat from '../manage/treat'

import Review from '../review/index'
import Manage from '../manage/index'

import details from '../manage/details'

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
            <Route path={`${match.path}/manage/:id`} exact component={details} />
            <Route path={`${match.path}/manage/:id/:type`} exact component={Manage} />
        </BaseLayout>
    )
}

export default PrimaryRoutes