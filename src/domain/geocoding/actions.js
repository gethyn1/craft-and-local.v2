/* eslint-disable import/prefer-default-export */
// @flow

import { GOOGLE_MAPS_API_KEY } from '../../config'
import {
  GEOCODING_ADDRESS_LOOKUP_IS_LOADING,
  GEOCODING_ADDRESS_LOOKUP_HAS_ERRORED,
  GEOCODING_ADDRESS_LOOKUP_SUCCESS,
} from './action-types'

export const geocodingGetLatLngFromAddress = (address: string) => (dispatch: Function) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API_KEY}`
  dispatch({
    type: GEOCODING_ADDRESS_LOOKUP_IS_LOADING,
    payload: true,
  })

  return fetch(url, { method: 'GET' })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      dispatch({
        type: GEOCODING_ADDRESS_LOOKUP_IS_LOADING,
        payload: false,
      })
      return response
    })
    .then(response => response.json())
    .then(data => dispatch({
      type: GEOCODING_ADDRESS_LOOKUP_SUCCESS,
      payload: data.results,
    }))
    .catch(() => dispatch({
      type: GEOCODING_ADDRESS_LOOKUP_HAS_ERRORED,
      payload: true,
    }))
}
