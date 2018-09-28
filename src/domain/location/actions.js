// @flow

import {
  LOCATION_IS_FETCHING_DATA,
  LOCATION_FETCH_DATA_SUCCESS,
  LOCATION_FETCH_HAS_ERRORED,
} from './action-types'
import { handlePageError } from '../../app/actions'
import api from '../../services/api'

export const getLocation = (service: Object) => (locationId: String) => (dispatch: Function) => {
  dispatch({ type: LOCATION_IS_FETCHING_DATA, payload: true })

  return service.getLocation(locationId)
    .then((data) => {
      dispatch({ type: LOCATION_FETCH_DATA_SUCCESS, payload: data })
    })
    .catch(err =>
      dispatch(handlePageError(err, { type: LOCATION_FETCH_HAS_ERRORED, payload: true })))
}

export const getLocationWithAPI = getLocation(api)
