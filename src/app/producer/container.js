// @flow

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as track from 'common/analytics/events'
import { getProducerWithAPI, trackProducerMetaLink } from './actions'
import { toggleModal } from '../actions'
import Producer from './producer'

const mapStateToProps = (state: Object, ownProps: Object) => ({
  userId: ownProps.match.params.id,
  producer: state.domain.producer.data,
  isFetching: state.domain.producer.meta.isFetching,
  hasErrored: state.domain.producer.meta.hasErrored,
  isSharing: state.app.ui.modals.shareProducer.isVisible,
})

const mapDispatchToProps = (dispatch: Function) => ({
  getProducer: (userId: String) => {
    dispatch(getProducerWithAPI(userId))
  },
  shareProfile: (isVisible: boolean, userId: string) => {
    dispatch(toggleModal({ modal: 'shareProducer', isVisible }))
    track.shareProducerModal(userId)
  },
  trackProducerMetaLink: (type: string, userId: string) => {
    dispatch(trackProducerMetaLink(type, userId))
  },
})

/**
 * NOTE: Directly connecting and exporting a component wrapped in `withRouter`
 * causes hot reloader to throw an error.
 */

const connectedProducerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Producer)

export default withRouter(connectedProducerContainer)
