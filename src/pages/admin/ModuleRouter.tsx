import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from '@friday/router'
import Login from './login'

const ModuleRouter = () => {
	const match = useRouteMatch()
    return (
		<Switch>
            <Route path={`${match.path}/login`} exact component={Login} />
            
        </Switch>
    )
}

export default ModuleRouter