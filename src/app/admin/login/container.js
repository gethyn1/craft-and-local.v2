// @flow

import { connect } from 'react-redux'
import { user } from 'src/domain'
import { Login } from './login'

const { authenticateUserWithAPI } = user.authentication.actions

const mapStateToProps = (state: Object) => ({
  isAuthenticating: state.domain.user.authentication.meta.isAuthenticating,
  hasErrored: state.domain.user.authentication.meta.hasErrored,
  hasAuthenticated: state.domain.user.authentication.meta.hasAuthenticated,
})

const mapDispatchToProps = {
  onSubmit: authenticateUserWithAPI,
}

export const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
