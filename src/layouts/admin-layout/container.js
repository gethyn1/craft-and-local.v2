// @flow

import { connect } from 'react-redux'
import { categories } from 'src/domain'
import { AdminLayout } from './admin-layout'

const mapDispatchToProps = {
  getCategories: categories.actions.getCategoriesWithAPI,
}

export const container = connect(
  null,
  mapDispatchToProps,
)(AdminLayout)
