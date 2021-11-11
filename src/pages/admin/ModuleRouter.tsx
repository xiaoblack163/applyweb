import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from '@friday/router'
import Login from './auth/Login'
import PrivateRoute from './PrivateRoute'
import PrimaryRouter from './layouts/PrimaryRouter'

const ModuleRouter = () => {
	const match = useRouteMatch()
    return (
		<Switch>
            <Route path={`${match.path}/login`} exact component={Login} />
            <PrivateRoute path={`${match.path}`} component={PrimaryRouter} />
        </Switch>
    )
}

export default ModuleRouter