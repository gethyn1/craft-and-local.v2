// @flow

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { producer } from 'src/domain'
import { Edit } from './edit'

const {
  getProducerWithAPI,
  updateProducerWithAPI,
  getLocationsForProducerWithAPI,
  resetProducer,
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
    return (
      <Edit
        userId={this.props.userId}
        producer={this.props.producer}
        isFetching={this.props.isFetching}
        hasErrored={this.props.hasErrored}
        hasUpdated={this.props.hasUpdated}
        onSubmit={this.props.onSubmit}
        categories={this.props.categories}
        locations={this.props.locations}
        locationsIsLoading={this.props.locationsIsLoading}
        locationsHasErrored={this.props.locationsHasErrored}
      />
    )
  }
}

const mapStateToProps = (state: Object, ownProps: Object) => ({
  userId: ownProps.match.params.userId,
  producer: state.admin.producer.data,
  isFetching: state.admin.producer.meta.isFetching,
  hasErrored: state.admin.producer.meta.hasErrored,
  hasUpdated: state.admin.producer.meta.hasUpdated,
  categories: state.domain.categories.data,
  locations: state.admin.producer.locations.data,
  locationsHasLoaded: state.admin.producer.locations.meta.hasLoaded,
  locationsIsLoading: state.admin.producer.locations.meta.isFetching,
  locationsHasErrored: state.admin.producer.locations.meta.hasErrored,
})

const mapDispatchToProps = {
  onSubmit: updateProducerWithAPI,
  fetchProducer: getProducerWithAPI,
  getLocations: getLocationsForProducerWithAPI,
  resetProducer,
}

export const container = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditContainer))
