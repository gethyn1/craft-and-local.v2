// @flow

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { path } from 'ramda'
import { trackPageNotFound } from './actions'
import { resetPageErrors } from '../actions'
import NotFound from './404'

const mapStateToProps = (state: Object, ownProps: Object) => ({
  path: path(['location', 'pathname'], ownProps),
})

const mapDispatchToProps = {
  trackPageNotFound,
  resetPageErrors,
}

/**
 * NOTE: Directly connecting and exporting a component wrapped in `withRouter`
 * causes hot reloader to throw an error.
 */

const connectedNotFoundContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotFound)

export default withRouter(connectedNotFoundContainer)
