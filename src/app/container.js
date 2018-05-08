// @flow

import { connect } from 'react-redux'
import { getUserLocation } from './location/user'
import App from './app'

const mapStateToProps = (state: Object) => ({}) // eslint-disable-line no-unused-vars

const mapDispatchToProps = {
  getUserLocation,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
