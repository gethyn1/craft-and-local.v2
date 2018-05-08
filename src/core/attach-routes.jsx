// @flow

import React from 'react'
import { Route } from 'react-router-dom'

function assignRoutes(route, i) {
  return route.exact
    ? (<Route path={route.path} exact component={route.component} key={i} />)
    : (<Route path={route.path} component={route.component} key={i} />)
}

const attachRoutes = (routes: Array<Object>) => routes.map(assignRoutes)

export default attachRoutes
