// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import { PRODUCERS_PATH } from '../config'
import attachRoutes from '../core/attach-routes'
import routes from './manifest'
import TopBar from './top-bar'
import NotFound from './404'

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
        <Switch>
          <Route exact path="/" render={() => <Redirect to={`/${PRODUCERS_PATH}`} />} />
          {attachRoutes(routes, this.props.pageNotFound)}
          <Route render={() => <NotFound />} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App
