// @flow

import {
  PRODUCER_IS_FETCHING_DATA,
  PRODUCER_FETCH_DATA_SUCCESS,
  PRODUCER_FETCH_HAS_ERRORED,
} from './action-types'
import { actions } from '../app'
import api from '../../services/api'

export const getProducer = (service: Object) => (userId: String) => (dispatch: Function) => {
  dispatch({ type: PRODUCER_IS_FETCHING_DATA, payload: true })

  return service.getProducer(userId)
    .then((data) => {
      dispatch({ type: PRODUCER_FETCH_DATA_SUCCESS, payload: data })
    })
    .catch(err =>
      dispatch(actions.handlePageError(err, { type: PRODUCER_FETCH_HAS_ERRORED, payload: true })))
}

export const getProducerWithAPI = getProducer(api)
