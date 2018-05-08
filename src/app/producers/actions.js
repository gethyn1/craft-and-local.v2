// @flow

import {
  PRODUCERS_IS_FETCHING_DATA,
  PRODUCERS_FETCH_DATA_SUCCESS,
  PRODUCERS_FETCH_HAS_ERRORED,
} from './action-types'

import api from '../../services/api'

const getProducers = () => (dispatch: Function) => {
  dispatch({ type: PRODUCERS_IS_FETCHING_DATA, payload: true })

  return api.getProducers()
    .then((data) => {
      dispatch({ type: PRODUCERS_FETCH_DATA_SUCCESS, payload: data })
    })
    .catch(() => dispatch({ type: PRODUCERS_FETCH_HAS_ERRORED, payload: true }))
}

export default {
  getProducers,
}
