// @flow

import * as track from 'common/analytics/events'
import {
  PRODUCER_IS_FETCHING_DATA,
  PRODUCER_FETCH_DATA_SUCCESS,
  PRODUCER_FETCH_HAS_ERRORED,
} from './action-types'
import { EMIT_ANALYTICS_EVENT } from '../analytics/action-types'
import { handlePageError } from '../actions'
import api from '../../services/api'

export const trackShareProducerModal = (userId: string) => ({
  type: EMIT_ANALYTICS_EVENT,
  payload: track.shareProducerModal(userId),
})

export const trackProducerMetaLink = (type: string, userId: string) => ({
  type: EMIT_ANALYTICS_EVENT,
  payload: track.producerMetaLink(type, userId),
})

export const trackShareProducerButton = (type: string, userId: string) => ({
  type: EMIT_ANALYTICS_EVENT,
  payload: track.shareProducerButton(type, userId),
})

export const getProducer = (service: Object) => (userId: String) => (dispatch: Function) => {
  dispatch({ type: PRODUCER_IS_FETCHING_DATA, payload: true })

  return service.getProducer(userId)
    .then((data) => {
      dispatch({ type: PRODUCER_FETCH_DATA_SUCCESS, payload: data })
    })
    .catch(err =>
      dispatch(handlePageError(err, { type: PRODUCER_FETCH_HAS_ERRORED, payload: true })))
}

export const getProducerWithAPI = getProducer(api)
