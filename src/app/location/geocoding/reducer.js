// @flow

import { combineReducers } from 'redux'
import {
  GEOCODING_ADDRESS_LOOKUP_IS_LOADING,
  GEOCODING_ADDRESS_LOOKUP_HAS_ERRORED,
  GEOCODING_ADDRESS_LOOKUP_SUCCESS,
  GEOCODING_ADDRESS_LOOKUP_RESET,
} from './action-types'

export const loadingReducer = (state: boolean = true, action: { type: string, payload: any }) => {
  switch (action.type) {
    case GEOCODING_ADDRESS_LOOKUP_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case GEOCODING_ADDRESS_LOOKUP_SUCCESS:
    case GEOCODING_ADDRESS_LOOKUP_HAS_ERRORED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

export const errorReducer = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case GEOCODING_ADDRESS_LOOKUP_IS_LOADING:
    case GEOCODING_ADDRESS_LOOKUP_SUCCESS:
      return {
        ...state,
        hasErrored: false,
      }
    case GEOCODING_ADDRESS_LOOKUP_HAS_ERRORED:
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state
  }
}

export const geocodingReducer = (state: Array = [], action: { type: string, payload: any }) => {
  switch (action.type) {
    case GEOCODING_ADDRESS_LOOKUP_SUCCESS:
      return {
        ...state,
        addressLookupOptions: action.payload.map(result => ({
          id: result.place_id,
          address: result.formatted_address,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
        })),
      }
    case GEOCODING_ADDRESS_LOOKUP_RESET:
      return {
        ...state,
        addressLookupOptions: [],
      }
    default:
      return state
  }
}

export default combineReducers({
  data: geocodingReducer,
  meta: combineReducers({
    isLoading: loadingReducer,
    hasErrored: errorReducer,
  }),
})
