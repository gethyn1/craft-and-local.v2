// @flow

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { categories, user } from 'src/domain'
import App from './app'

const mapStateToProps = (state: Object) => ({
  pageNotFound: state.app.ui.pageErrors.pageNotFound,
})

const mapDispatchToProps = {
  getUserLocation: user.location.actions.getUserLocation,
  getCategories: categories.actions.getCategoriesWithAPI,
}

/**
 * NOTE: Directly connecting and exporting a component wrapped in `withRouter`
 * causes hot reloader to throw an error.
 */

const connectedAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

export default withRouter(connectedAppContainer)
