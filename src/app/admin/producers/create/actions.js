// @flow

import {
  CREATE_PRODUCER_REQUESTED,
  CREATE_PRODUCER_SUCCEEDED,
  CREATE_PRODUCER_HAS_ERRORED,
} from './action-types'

import api from '../../../../services/api'
import { handlePageError } from '../../../actions'

export const createProducer = (service: Object) => (producer: Object) => (dispatch: Function) => {
  dispatch({ type: CREATE_PRODUCER_REQUESTED, payload: true })

  return service.createProducer(producer)
    .then((data) => {
      dispatch({ type: CREATE_PRODUCER_SUCCEEDED, payload: data })
    })
    .catch(err =>
      dispatch(handlePageError(err, { type: CREATE_PRODUCER_HAS_ERRORED, payload: true })))
}

export const createProducerWithAPI = createProducer(api)
