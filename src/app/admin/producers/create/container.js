// @flow

import { connect } from 'react-redux'
import { Create } from './create'
import { createProducerWithAPI } from './actions'

const mapStateToProps = (state: Object) => ({
  isFetching: state.domain.admin.producers.create.meta.isFetching,
  hasErrored: state.domain.admin.producers.create.meta.hasErrored,
})

const mapDispatchToProps = {
  onSubmit: createProducerWithAPI,
}

export const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Create)
