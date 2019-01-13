// @flow

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { omit } from 'ramda'
import { producer } from 'src/domain'
import { Edit } from './edit'

const {
  getProducerWithAPI,
  updateProducerWithAPI,
  getLocationsForProducerWithAPI,
  resetProducer,
  resetProducerMeta,
} = producer.actions

type Props = {
  userId: string,
  producer: Object,
  onSubmit: Function,
  isFetching: boolean,
  hasErrored: boolean,
  hasUpdated: boolean,
  fetchProducer: Function,
  categories: ?Array<Object>,
  getLocations: Function,
  locations: ?Array<Object>,
  locationsHasLoaded: boolean,
  locationsIsLoading: boolean,
  locationsHasErrored: boolean,
  resetProducer: Function,
}

class EditContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchProducer(this.props.userId)
  }

  componentDidUpdate() {
    const { locationsIsLoading, locationsHasLoaded } = this.props
    if (this.props.producer && !locationsHasLoaded && !locationsIsLoading) {
      this.props.getLocations(this.props.producer._id)
    }
  }

  componentWillUnmount() {
    this.props.resetProducer()
  }

  render() {
    return <Edit {...omit(['getLocations', 'resetProducer'], this.props)} />
  }
}

const mapStateToProps = (state: Object, ownProps: Object) => ({
  userId: ownProps.match.params.userId,
  producer: state.admin.producer.data,
  isFetching: state.admin.producer.meta.isFetching,
  hasErrored: state.admin.producer.meta.hasErrored,
  isUpdating: state.admin.producer.meta.isUpdating,
  hasUpdated: state.admin.producer.meta.hasUpdated,
  categories: state.domain.categories.data,
  locations: state.admin.producer.locations.data,
  locationsHasLoaded: state.admin.producer.locations.meta.hasLoaded,
  locationsIsLoading: state.admin.producer.locations.meta.isFetching,
  locationsHasErrored: state.admin.producer.locations.meta.hasErrored,
})

const mapDispatchToProps = (dispatch: Function) => ({
  onSubmit: (userId: String, producerState: Object) => {
    dispatch(updateProducerWithAPI(userId, producerState))
  },
  fetchProducer: (userId: String) => {
    dispatch(getProducerWithAPI(userId))
  },
  getLocations: (userId: String) => dispatch(getLocationsForProducerWithAPI(userId)),
  resetProducer: () => dispatch(resetProducer()),
  dismissNotification: () => dispatch(resetProducerMeta()),
})

export const container = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditContainer))
