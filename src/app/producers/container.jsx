// @flow
import React from 'react'
import { connect } from 'react-redux'
import actions from './actions'
import Producers from './producers'

type Props = {
  getProducers: Function,
  producers: Array<Object>,
  isFetching: boolean,
  hasErrored: boolean,
  userLatLng: {
    latitude: string,
    longitude: string,
  },
}

class ProducersContainer extends React.Component {
  componentDidMount() {
    this.props.getProducers()
  }

  props: Props

  render() {
    const { isFetching, hasErrored, producers, userLatLng } = this.props

    return (
      <Producers
        isFetching={isFetching}
        producers={producers}
        userLatLng={userLatLng}
        hasErrored={hasErrored}
      />
    )
  }
}

const mapStateToProps = (state: Object) => ({
  producers: state.domain.producers.data,
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
