// @flow

import { connect } from 'react-redux'
import { user } from 'src/domain'
import {
  STORAGE_IS_AUTHENTICATED,
  STORAGE_IS_ADMIN,
} from '../../config'
import { AuthenticatedRoute } from './authenticated-route'

const { setAuthenticationReferrerPath } = user.authentication.actions

const parseBooleanString = string => string === 'true'

const mapStateToProps = (state: Object, ownProps: Object) => ({
  isAuthenticated: parseBooleanString(sessionStorage.getItem(STORAGE_IS_AUTHENTICATED)),
  isAdmin: parseBooleanString(sessionStorage.getItem(STORAGE_IS_ADMIN)),
  Component: ownProps.component,
  isAdminComponent: ownProps.adminComponent,
})

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
