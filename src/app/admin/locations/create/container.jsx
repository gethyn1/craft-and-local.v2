// @flow

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { omit } from 'ramda'
import { producer, location } from 'src/domain'
import { Create } from './create'
import type { Props } from './create'

const { createLocationWithAPI } = location.actions
const { getProducerWithAPI } = producer.actions

type ContainerProps = {
  ...Props,
  producerId: string,
  getProducer: Function,
}

class CreateContainer extends React.Component<ContainerProps> {
  componentDidMount() {
    this.props.getProducer(this.props.producerId)
  }

  render() {
    const props = omit(['getProducer', 'producerId'], this.props)

    return <Create {...props} />
  }
}

const mapStateToProps = (state: Object, ownProps: Object) => ({
  producerId: ownProps.match.params.producerId,
  location: state.domain.admin.location.data,
  producer: state.domain.admin.producer.data,
  hasErrored: state.domain.admin.location.meta.hasErrored,
  isUpdating: state.domain.admin.location.meta.isUpdating,
  hasUpdated: state.domain.admin.location.meta.hasUpdated,
})

const mapDispatchToProps = {
  onSubmit: createLocationWithAPI,
  getProducer: getProducerWithAPI,
}

export const container = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateContainer))
