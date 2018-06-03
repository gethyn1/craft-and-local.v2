// @flow

import * as React from 'react'
import { Route } from 'react-router-dom'
import { curry } from 'ramda'
import NotFound from '../app/404'

type RouteType = {
  path: string,
  component: React.Node,
  exact: Boolean,
}

export function assignRoute(pageNotFound: boolean, route: RouteType, i: number) {
  return route.exact
    ? (<Route path={route.path} exact component={pageNotFound ? NotFound : route.component} key={i} />)
    : (<Route path={route.path} component={pageNotFound ? NotFound : route.component} key={i} />)
}

const attachRoutes : Function = (routes: Array<RouteType>, pageNotFound: boolean) =>
  routes.map(curry(assignRoute)(pageNotFound))

export default attachRoutes
