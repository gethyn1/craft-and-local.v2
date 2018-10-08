// @flow

import { connect } from 'react-redux'
import { location } from 'src/domain'
import { Create } from './create'

const { createLocationWithAPI } = location.actions

const mapStateToProps = (state: Object) => ({
  location: state.domain.admin.location.data,
  producer: state.domain.admin.producer.data,
  hasErrored: state.domain.admin.location.meta.hasErrored,
  isUpdating: state.domain.admin.location.meta.isUpdating,
  hasUpdated: state.domain.admin.location.meta.hasUpdated,
})

const mapDispatchToProps = {
  onSubmit: createLocationWithAPI,
}

export const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Create)
