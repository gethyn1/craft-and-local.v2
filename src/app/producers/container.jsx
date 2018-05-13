// @flow
import React from 'react'
import { connect } from 'react-redux'
import actions from './actions'
import Producers from './producers'

type Props = {
  getProducers: Function,
  producers: Array<Object>,
  markers: Array<Object>,
  isFetching: boolean,
  hasErrored: boolean,
  latitude: string,
  longitude: string,
}

class ProducersContainer extends React.Component<Props> {
  componentDidUpdate(prevProps) {
    const { latitude, longitude } = this.props
    if (latitude !== prevProps.latitude || longitude !== prevProps.longitude) {
      this.props.getProducers({ lat: latitude, lng: longitude })
    }
  }

  render() {
    const { isFetching, hasErrored, producers, markers, latitude, longitude } = this.props

    return (
      <Producers
        markers={markers}
        producers={producers}
        isFetching={isFetching}
        userLatLng={{ latitude, longitude }}
        hasErrored={hasErrored}
      />
    )
  }
}

const mapStateToProps = (state: Object) => ({
  producers: state.domain.producers.data.producers,
  markers: state.domain.producers.data.markers,
  isFetching: state.domain.producers.meta.isFetching,
  hasErrored: state.domain.producers.meta.hasErrored,
  latitude: state.user.location.data.latitude,
  longitude: state.user.location.data.longitude,
})

const mapDispatchToProps = ({
  getProducers: actions.getProducers,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProducersContainer)
