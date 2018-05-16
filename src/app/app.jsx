// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Container from 'common/components/container'
import attachRoutes from '../core/attach-routes'
import routes from './manifest'
import TopBar from './top-bar'

type Props = {
  getUserLocation: Function,
  getCategories: Function,
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
          <Route exact path="/" render={() => <Container><p>This is the homepage</p></Container>} />
          {attachRoutes(routes)}
        </Switch>
      </React.Fragment>
    )
  }
}

export default App
