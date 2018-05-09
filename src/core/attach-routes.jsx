// @flow

import * as React from 'react'
import { Route } from 'react-router-dom'

type RouteType = {
  path: string,
  component: React.Node,
  exact: Boolean,
}

function assignRoutes(route: RouteType, i: number) {
  return route.exact
    ? (<Route path={route.path} exact component={route.component} key={i} />)
    : (<Route path={route.path} component={route.component} key={i} />)
}

const attachRoutes : Function = (routes: Array<RouteType>) => routes.map(assignRoutes)

export default attachRoutes
