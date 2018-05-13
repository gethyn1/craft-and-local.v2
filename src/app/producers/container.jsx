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
  userLatLng: {
    latitude: string,
    longitude: string,
  },
}

class ProducersContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.getProducers()
  }

  render() {
    const { isFetching, hasErrored, producers, markers, userLatLng } = this.props

    return (
      <Producers
        markers={markers}
        producers={producers}
        isFetching={isFetching}
        userLatLng={userLatLng}
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
  userLatLng: {
    latitude: state.user.location.data.latitude,
    longitude: state.user.location.data.longitude,
  },
})

const mapDispatchToProps = ({
  getProducers: actions.getProducers,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProducersContainer)
