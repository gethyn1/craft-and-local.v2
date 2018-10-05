// @flow

import {
  LOCATION_IS_FETCHING_DATA,
  LOCATION_FETCH_DATA_SUCCESS,
  LOCATION_FETCH_HAS_ERRORED,
  LOCATION_UPDATE_REQUESTED,
  LOCATION_UPDATE_SUCCEEDED,
  LOCATION_UPDATE_FAILED,
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

export const updateLocation = (service: Object) => (id: string, location: Object) => (dispatch: Function) => {
  dispatch({ type: LOCATION_UPDATE_REQUESTED })

  return service.updateLocation(id, location)
    .then((data) => {
      dispatch({ type: LOCATION_UPDATE_SUCCEEDED, payload: data })
    })
    .catch(err =>
      dispatch(handlePageError(err, { type: LOCATION_UPDATE_FAILED })))
}

export const getLocationWithAPI = getLocation(api)
export const updateLocationWithAPI = updateLocation(api)
