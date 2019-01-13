// @flow

import { connect } from 'react-redux'
import { categories } from 'src/domain'
import { AddCategory } from './add-category'

const { createCategoryWithAPI, resetCategoriesMeta } = categories.actions

const mapStateToProps = (state: Object) => ({
  isCreating: state.domain.categories.meta.isCreating,
  hasErrored: state.domain.categories.meta.hasErrored,
  hasCreated: state.domain.categories.meta.hasCreated,
})

const mapDispatchToProps = {
  onSubmit: createCategoryWithAPI,
  dismissNotification: resetCategoriesMeta,
}

const container = connect(mapStateToProps, mapDispatchToProps)(AddCategory)

export { container }
