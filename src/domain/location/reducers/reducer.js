// @flow

import { combineReducers } from 'redux'
import {
  LOCATION_IS_FETCHING_DATA,
  LOCATION_FETCH_DATA_SUCCESS,
  LOCATION_FETCH_HAS_ERRORED,
} from '../types'

const location = (state: ?Object = null, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOCATION_FETCH_DATA_SUCCESS:
      return action.payload
    default:
      return state
  }
}

const isFetching = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOCATION_IS_FETCHING_DATA:
      return true
    case LOCATION_FETCH_HAS_ERRORED:
    case LOCATION_FETCH_DATA_SUCCESS:
      return false
    default:
      return state
  }
}

const hasErrored = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOCATION_IS_FETCHING_DATA:
    case LOCATION_FETCH_DATA_SUCCESS:
      return false
    case LOCATION_FETCH_HAS_ERRORED:
      return true
    default:
      return state
  }
}

export const reducer = combineReducers({
  data: location,
  meta: combineReducers({
    isFetching,
    hasErrored,
  }),
})
