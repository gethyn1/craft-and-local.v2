// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import { PRODUCERS_PATH } from 'common/constants/paths'
import attachRoutes from '../core/attach-routes'
import Analytics from './analytics'
import routes from './manifest'
import TopBar from './top-bar'
import NotFound from './404'
import Footer from './footer'

type Props = {
  getUserLocation: Function,
  getCategories: Function,
  pageNotFound: boolean,
}

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.getUserLocation()
    this.props.getCategories()
  }

  render() {
    return (
      <React.Fragment>
        <TopBar />
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
          {attachRoutes(routes, this.props.pageNotFound)}
          <Route render={() => <NotFound />} />
        </Switch>
        <Footer />
      </React.Fragment>
    )
  }
}

export default App
