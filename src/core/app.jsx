// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import { PRODUCERS_PATH } from 'common/constants/paths'
import attachRoutes from '../core/attach-routes'
import Analytics from '../components/analytics'
import routes from './manifest'
import NotFound from '../pages/404'

type Props = {
  pageNotFound: boolean,
}

const App = ({ pageNotFound }: Props) => (
  <React.Fragment>
    <Route
      path="/"
      render={() => {
        window.scrollTo(0, 0)
        return null
      }}
    />
    <Route path="/" component={Analytics} />
    <Switch>
      <Route exact path="/" render={() => <Redirect to={PRODUCERS_PATH} />} />
      {attachRoutes(routes, pageNotFound)}
      <Route render={() => <NotFound />} />
    </Switch>
  </React.Fragment>
)

export default App
