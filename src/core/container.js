// @flow

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import App from './app'

const mapStateToProps = (state: Object) => ({
  pageNotFound: state.app.ui.pageErrors.pageNotFound,
})

/**
 * NOTE: Directly connecting and exporting a component wrapped in `withRouter`
 * causes hot reloader to throw an error.
 */

const connectedAppContainer = connect(
  mapStateToProps,
  null,
)(App)

export default withRouter(connectedAppContainer)
