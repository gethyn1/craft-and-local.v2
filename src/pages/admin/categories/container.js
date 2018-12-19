// @flow

import { connect } from 'react-redux'
import { path } from 'ramda'
import { Categories } from './categories'

const mapStateToProps = (state: Object) => ({
  categories: path(['domain', 'categories', 'data'], state),
})

export const container = connect(
  mapStateToProps,
  null,
)(Categories)
