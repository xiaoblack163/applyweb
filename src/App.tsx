
import React from 'react'
import { Switch, Route, Router } from '@friday/router'
import Home from './pages/home'
import NotFound from 'src/pages/exception/NotFound'
import AdminRouter from 'src/pages/admin/ModuleRouter'
import userRouter from 'src/pages/user/ModuleRouter'

import 'src/styles/index.less'

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/404"  component={NotFound} />  
        <Route path="/admin" component={AdminRouter} />  
        <Route path="/user" component={userRouter} />  
        <Route path='/' exact component={Home} />
      </Switch>
    </Router>
  )
}

export default App
