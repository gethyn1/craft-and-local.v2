// @flow
import { GOOGLE_MAPS_API_KEY } from '../../../config'
import {
  LOCATION_IS_LOADING,
  LOCATION_HAS_ERRORED,
  LOCATION_GET_POSITION_SUCCESS,
  LOCATION_GET_ADDRESS_FROM_LAT_LNG_SUCCESS,
} from './action-types'

export const getAddressFromLatLng = (lat: number, lng: number) => (dispatch: Function) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`

  return fetch(url, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      return response
    })
    .then(response => response.json())
    .then((address) => {
      dispatch({
        type: LOCATION_GET_ADDRESS_FROM_LAT_LNG_SUCCESS,
        payload: address.results[0].formatted_address,
      })
    })
    .catch(() => dispatch({ type: LOCATION_HAS_ERRORED, payload: true }))
}

export const getUserLocation = () => (dispatch: Function) => {
  dispatch({ type: LOCATION_IS_LOADING, payload: true })

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords

      dispatch(getAddressFromLatLng(latitude, longitude))
      dispatch({
        type: LOCATION_GET_POSITION_SUCCESS,
        payload: { latitude, longitude },
      })
    })
  } else {
    dispatch({ type: LOCATION_HAS_ERRORED, payload: true })
  }
}
