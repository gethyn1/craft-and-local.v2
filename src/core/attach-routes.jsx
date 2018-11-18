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
  id: string,
}

export const assignRoute = (pageNotFound: boolean, route: RouteType) => {
  const component = pageNotFound ? NotFound : route.component

  if (route.authenticated) {
    return (
      <AuthenticatedRoute
        path={route.path}
        exact={route.exact}
        component={component}
        key={route.id}
        adminComponent={route.isAdminRoute}
      />
    )
  }

  return (
    <Route
      path={route.path}
      exact={route.exact}
      component={component}
      key={route.id}
    />
  )
}

const attachRoutes : Function = (routes: Array<RouteType>, pageNotFound: boolean) =>
  routes.map(curry(assignRoute)(pageNotFound))

export default attachRoutes
