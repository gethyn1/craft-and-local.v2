// @flow

import { combineReducers } from 'redux'
import {
  LOCATION_IS_LOADING,
  LOCATION_HAS_ERRORED,
  LOCATION_GET_POSITION_SUCCESS,
  LOCATION_GET_ADDRESS_FROM_LAT_LNG_SUCCESS,
} from './action-types'

export const initialState = {
  latitude: 0,
  longitude: 0,
  address: null,
}

export const isLoading = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOCATION_IS_LOADING:
      return true
    case LOCATION_GET_ADDRESS_FROM_LAT_LNG_SUCCESS:
    case LOCATION_HAS_ERRORED:
      return false
    default:
      return state
  }
}

export const hasErrored = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOCATION_IS_LOADING:
    case LOCATION_GET_ADDRESS_FROM_LAT_LNG_SUCCESS:
      return false
    case LOCATION_HAS_ERRORED:
      return true
    default:
      return state
  }
}

export const hasFetched = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOCATION_IS_LOADING:
    case LOCATION_HAS_ERRORED:
      return false
    case LOCATION_GET_POSITION_SUCCESS:
      return true
    default:
      return state
  }
}

export const location = (
  state: { latitude: number, longitude: number, address: ?string } = initialState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case LOCATION_GET_POSITION_SUCCESS:
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      }
    case LOCATION_GET_ADDRESS_FROM_LAT_LNG_SUCCESS:
      return {
        ...state,
        address: action.payload,
      }
    default:
      return state
  }
}

export default combineReducers({
  data: location,
  meta: combineReducers({
    isLoading,
    hasErrored,
    hasFetched,
  }),
})
