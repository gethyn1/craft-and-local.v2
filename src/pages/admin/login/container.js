// @flow

import { connect } from 'react-redux'
import { user } from 'src/domain'
import { PRODUCERS_ADMIN_ROUTE } from 'common/constants/paths'
import { Login } from './login'

const { authenticateUserWithAPI } = user.authentication.actions

const mapStateToProps = (state: Object) => ({
  isAuthenticating: state.domain.user.authentication.meta.isAuthenticating,
  hasErrored: state.domain.user.authentication.meta.hasErrored,
  hasAuthenticated: state.domain.user.authentication.meta.hasAuthenticated,
  referrerPath: state.domain.user.authentication.meta.referrerPath || PRODUCERS_ADMIN_ROUTE,
})

const mapDispatchToProps = {
  onSubmit: authenticateUserWithAPI,
}

export const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
