// @flow

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { location } from 'src/domain'
import {
  trackShareProducerModal,
  trackShareProducerButton,
} from './actions'
import { toggleModal } from '../actions'
import Producer from './producer'

const { getProducerWithAPI, trackProducerMetaLink } = location.actions

const mapStateToProps = (state: Object, ownProps: Object) => ({
  userId: ownProps.match.params.id,
  location: state.domain.location.data,
  isFetching: state.domain.location.meta.isFetching,
  hasErrored: state.domain.location.meta.hasErrored,
  isSharing: state.app.ui.modals.shareProducer.isVisible,
})

const mapDispatchToProps = (dispatch: Function) => ({
  getProducer: (userId: String) => {
    dispatch(getProducerWithAPI(userId))
  },
  shareProfile: (isVisible: boolean, userId: string) => {
    dispatch(toggleModal({ modal: 'shareProducer', isVisible }))

    if (isVisible) {
      dispatch(trackShareProducerModal(userId))
    }
  },
  trackProducerMetaLink: (type: string, userId: string) => {
    dispatch(trackProducerMetaLink(type, userId))
  },
  trackShareProducerButton: (type: string, userId: string) => {
    dispatch(trackShareProducerButton(type, userId))
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
