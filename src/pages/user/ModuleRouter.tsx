import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from '@friday/router'
import Login from 'src/pages/user/auth/Login'
import Register from 'src/pages/user/auth/Register'
import Reset from 'src/pages/user/auth/Reset'
import PrivateRoute from './PrivateRoute'
import PrimaryRouter from './layouts/PrimaryRouter'

const ModuleRouter = () => {
	const match = useRouteMatch()
    return (
		<Switch>
            <Route path={`${match.path}/login`} exact component={Login} />
            <Route path={`${match.path}/register`} exact component={Register} />
            <Route path={`${match.path}/Reset`} exact component={Reset} />
            <PrivateRoute path={`${match.path}`} component={PrimaryRouter} />
        </Switch>
    )
}

export default ModuleRouter