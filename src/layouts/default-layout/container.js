// @flow

import { connect } from 'react-redux'
import { categories, user } from 'src/domain'
import { DefaultLayout } from './default-layout'

const mapDispatchToProps = {
  getUserLocation: user.location.actions.getUserLocation,
  getCategories: categories.actions.getCategoriesWithAPI,
}

export const container = connect(
  null,
  mapDispatchToProps,
)(DefaultLayout)
