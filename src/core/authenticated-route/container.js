// @flow

import { path } from 'ramda'
import { connect } from 'react-redux'
import { user } from 'src/domain'
import { AuthenticatedRoute } from './authenticated-route'

const { setAuthenticationReferrerPath } = user.authentication.actions

const mapStateToProps = (state: Object, ownProps: Object) => {
  const authentication = path(['domain', 'user', 'authentication'], state)

  return {
    isAuthenticated: path(['meta', 'hasAuthenticated'], authentication),
    isAdmin: path(['data', 'isAdmin'], authentication),
    Component: ownProps.component,
    isAdminComponent: ownProps.adminComponent,
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  setReferrerPath: (referrerPath: string) => {
    dispatch(setAuthenticationReferrerPath(referrerPath))
  },
})

const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticatedRoute)

export { container }
