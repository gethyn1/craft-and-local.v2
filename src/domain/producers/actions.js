// @flow

import {
  PRODUCERS_FETCH_DATA_REQUESTED,
  PRODUCERS_FETCH_DATA_SUCCEEDED,
  PRODUCERS_FETCH_DATA_FAILED,
} from './action-types'
import { handlePageError } from '../../pages/actions'
import api from '../../services/api'

export const getProducers = (service: Object) => () => (dispatch: Function) => {
  dispatch({ type: PRODUCERS_FETCH_DATA_REQUESTED })

  return service.getProducers()
    .then((data) => {
      dispatch({ type: PRODUCERS_FETCH_DATA_SUCCEEDED, payload: data })
    })
    .catch(err =>
      dispatch(handlePageError(err, { type: PRODUCERS_FETCH_DATA_FAILED })))
}

export const getProducersWithAPI = getProducers(api)
