// @flow

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { LOGIN_PATH } from 'common/constants/paths'

type Props = {
  isAuthenticated: boolean,
  isAdmin: boolean,
  component: any,
  isAdminComponent?: boolean,
  setReferrerPath: Function,
}

const AuthenticatedRoute = ({
  isAuthenticated,
  isAdmin,
  setReferrerPath,
  component: Component,
  isAdminComponent,
  ...rest }: Props) => {
  // Set redirect path based on authenticated status.
  // If not authenticated, user is redirect to first path.
  // If authenticated but not admin, user is redirected to second path.
  const pathname = !isAuthenticated ? LOGIN_PATH : '/'

  if (!isAuthenticated) {
    /* eslint-disable-next-line no-restricted-globals */
    setReferrerPath(location.pathname)
  }

  return (
    <Route
      {...rest}
      render={props => (
        isAuthenticated && (isAdmin === isAdminComponent) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname,
            }}
          />
        )
      )}
    />
  )
}

AuthenticatedRoute.defaultProps = {
  isAdminComponent: false,
}

export { AuthenticatedRoute }
