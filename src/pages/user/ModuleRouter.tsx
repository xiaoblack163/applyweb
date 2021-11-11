import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from '@friday/router'
import Login from 'src/pages/admin/login'
import PrivateRoute from './PrivateRoute'

const ModuleRouter = () => {
	const match = useRouteMatch()
    return (
		<Switch>
            <Route path={`${match.path}/login`} exact component={Login} />
            <PrivateRoute path={`${match.path}`} component={} />
        </Switch>
    )
}

export default ModuleRouter