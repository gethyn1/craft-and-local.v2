// @flow

import { connect } from 'react-redux'
import { Create } from './create'
import { createProducerWithAPI } from '../actions'

const mapStateToProps = (state: Object) => ({
  isFetching: state.domain.admin.producer.meta.isFetching,
  hasErrored: state.domain.admin.producer.meta.hasErrored,
  hasUpdated: state.domain.admin.producer.meta.hasUpdated,
})

const mapDispatchToProps = {
  onSubmit: createProducerWithAPI,
}

export const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Create)
