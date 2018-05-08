// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import attachRoutes from '../core/attach-routes'
import routes from './manifest'

type Props = {
  getUserLocation: Function,
}

class App extends React.Component {
  componentDidMount() {
    this.props.getUserLocation()
  }

  props: Props

  render() {
    return (
      <div>
        <Route
          path="/"
          render={() => {
            window.scrollTo(0, 0)
            return null
          }}
        />
        <Switch>
          <Route exact path="/" render={() => <div><p>Test</p></div>} />
          {attachRoutes(routes)}
        </Switch>
      </div>
    )
  }
}

export default App
