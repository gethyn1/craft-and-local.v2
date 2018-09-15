// @flow

import {
  CREATE_PRODUCER_REQUESTED,
  CREATE_PRODUCER_SUCCEEDED,
  CREATE_PRODUCER_HAS_ERRORED,
  UPDATE_PRODUCER_REQUESTED,
  UPDATE_PRODUCER_SUCCEEDED,
  UPDATE_PRODUCER_HAS_ERRORED,
} from './action-types'

import api from '../../../services/api'
import { handlePageError } from '../../actions'

export const createProducer = (service: Object) => (producer: Object) => (dispatch: Function) => {
  dispatch({ type: CREATE_PRODUCER_REQUESTED })

  return service.createProducer(producer)
    .then((data) => {
      dispatch({ type: CREATE_PRODUCER_SUCCEEDED, payload: data })
    })
    .catch(err =>
      dispatch(handlePageError(err, { type: CREATE_PRODUCER_HAS_ERRORED })))
}

export const updateProducer = (service: Object) => (userId: string, producer: Object) => (dispatch: Function) => {
  dispatch({ type: UPDATE_PRODUCER_REQUESTED })

  return service.updateProducer(userId, producer)
    .then((data) => {
      dispatch({ type: UPDATE_PRODUCER_SUCCEEDED, payload: data })
    })
    .catch(err =>
      dispatch(handlePageError(err, { type: UPDATE_PRODUCER_HAS_ERRORED })))
}

export const createProducerWithAPI = createProducer(api)
export const updateProducerWithAPI = updateProducer(api)
