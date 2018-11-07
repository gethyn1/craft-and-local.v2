// @flow

import * as React from 'react'
import { Route } from 'react-router-dom'
import { curry } from 'ramda'
import { AuthenticatedRoute } from './authenticated-route'
import NotFound from '../app/404'

type RouteType = {
  path: string,
  component: React.Node,
  exact: Boolean,
  authenticated: boolean,
  isAdminRoute: boolean,
}

export const assignRoute = (pageNotFound: boolean, route: RouteType, i: number) => {
  const component = pageNotFound ? NotFound : route.component

  if (route.authenticated) {
    return route.exact
      ? (<AuthenticatedRoute path={route.path} exact component={component} key={i} adminComponent={route.isAdminRoute} />)
      : (<AuthenticatedRoute path={route.path} component={component} key={i} adminComponent={route.isAdminRoute} />)
  }

  return route.exact
    ? (<Route path={route.path} exact component={component} key={i} />)
    : (<Route path={route.path} component={component} key={i} />)
}

const attachRoutes : Function = (routes: Array<RouteType>, pageNotFound: boolean) =>
  routes.map(curry(assignRoute)(pageNotFound))

export default attachRoutes
