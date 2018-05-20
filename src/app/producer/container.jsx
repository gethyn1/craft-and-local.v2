// @flow

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import actions from './actions'
import { toggleModal } from '../actions'
import Producer from './producer'

type Props = {
  userId: string,
  getProducer: Function,
  producer: Object,
  isFetching: boolean,
  hasErrored: boolean,
  isSharing: boolean,
  shareProfile: Function,
}

class ProducerContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.getProducer(this.props.userId)
  }

  props: Props

  render() {
    const { isFetching, hasErrored, producer, isSharing, shareProfile } = this.props

    return (
      <Producer
        isFetching={isFetching}
        hasErrored={hasErrored}
        producer={producer}
        isSharing={isSharing}
        shareProfile={shareProfile}
      />
    )
  }
}

const mapStateToProps = (state: Object, ownProps: Object) => ({
  userId: ownProps.match.params.id,
  producer: state.domain.producer.data,
  isFetching: state.domain.producer.meta.isFetching,
  isSharing: state.app.ui.modals.shareProducer.isVisible,
})

const mapDispatchToProps = (dispatch: Function) => ({
  getProducer: (userId: String) => {
    dispatch(actions.getProducerWithAPI(userId))
  },
  shareProfile: (isVisible: boolean) => {
    dispatch(toggleModal({ modal: 'shareProducer', isVisible }))
  },
})

/**
 * NOTE: Directly connecting and exporting a component wrapped in `withRouter`
 * causes hot reloader to throw an error.
 */

const connectedProducerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProducerContainer)

export default withRouter(connectedProducerContainer)
