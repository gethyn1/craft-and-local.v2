// @flow
import React from 'react'
import { connect } from 'react-redux'
import actions from './actions'
import Producers from './producers'

type Props = {
  getProducers: Function,
  producers: Array<Object>,
  markers: Array<Object>,
  searchProximity: Array<string>,
  producersAtSearchProximity: Array<string>,
  isFetching: boolean,
  hasErrored: boolean,
  latitude: string,
  longitude: string,
  loadMoreProducers: Function,
  noMoreProducers: boolean,
}

class ProducersContainer extends React.Component<Props> {
  componentDidUpdate(prevProps) {
    const { latitude, longitude } = this.props
    if (latitude !== prevProps.latitude || longitude !== prevProps.longitude) {
      this.props.getProducers({ latitude, longitude })
    }
  }

  render() {
    const {
      isFetching,
      hasErrored,
      producers,
      markers,
      searchProximity,
      producersAtSearchProximity,
      latitude,
      longitude,
      loadMoreProducers,
      noMoreProducers,
    } = this.props

    return (
      <Producers
        markers={markers}
        producers={producers}
        searchProximity={searchProximity}
        producersAtSearchProximity={producersAtSearchProximity}
        isFetching={isFetching}
        userLatLng={{ latitude, longitude }}
        hasErrored={hasErrored}
        loadMoreProducers={loadMoreProducers}
        noMoreProducers={noMoreProducers}
      />
    )
  }
}

const mapStateToProps = (state: Object) => ({
  producers: state.domain.producers.data.producers,
  markers: state.domain.producers.data.markers,
  searchProximity: state.domain.producers.data.searchProximity,
  producersAtSearchProximity: state.domain.producers.data.producersAtSearchProximity,
  noMoreProducers: state.domain.producers.meta.noMoreProducers,
  isFetching: state.domain.producers.meta.isFetching,
  hasErrored: state.domain.producers.meta.hasErrored,
  latitude: state.user.location.data.latitude,
  longitude: state.user.location.data.longitude,
})

const mapDispatchToProps = ({
  getProducers: actions.getProducersWithAPI,
  loadMoreProducers: actions.loadMoreProducersWithAPI,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProducersContainer)
