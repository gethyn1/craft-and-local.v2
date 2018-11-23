// @flow

import { combineReducers } from 'redux'
import {
  LOCATION_IS_FETCHING_DATA,
  LOCATION_FETCH_DATA_SUCCESS,
  LOCATION_FETCH_HAS_ERRORED,
  LOCATION_UPDATE_REQUESTED,
  LOCATION_UPDATE_SUCCEEDED,
  LOCATION_UPDATE_FAILED,
  CREATE_LOCATION_REQUESTED,
  CREATE_LOCATION_SUCCEEDED,
  CREATE_LOCATION_FAILED,
} from '../types'

const locationReducer = (state: ?Array<Object> = null, action: { type: string, payload: any }) => {
  switch (action.type) {
    case CREATE_LOCATION_SUCCEEDED:
    case LOCATION_FETCH_DATA_SUCCESS:
    case LOCATION_UPDATE_SUCCEEDED:
      return action.payload
    default:
      return state
  }
}

const isFetching = (state: boolean = false, action: { type: string }) => {
  switch (action.type) {
    case LOCATION_IS_FETCHING_DATA:
      return true
    case CREATE_LOCATION_SUCCEEDED:
    case CREATE_LOCATION_FAILED:
    case LOCATION_FETCH_DATA_SUCCESS:
    case LOCATION_FETCH_HAS_ERRORED:
      return false
    default:
      return state
  }
}

const hasErrored = (state: boolean = false, action: { type: string }) => {
  switch (action.type) {
    case CREATE_LOCATION_SUCCEEDED:
    case CREATE_LOCATION_REQUESTED:
    case LOCATION_IS_FETCHING_DATA:
    case LOCATION_FETCH_DATA_SUCCESS:
      return false
    case CREATE_LOCATION_FAILED:
    case LOCATION_FETCH_HAS_ERRORED:
      return true
    default:
      return state
  }
}

const hasLoaded = (state: boolean = false, action: { type: string }) => {
  switch (action.type) {
    case LOCATION_IS_FETCHING_DATA:
    case LOCATION_FETCH_HAS_ERRORED:
      return false
    case LOCATION_FETCH_DATA_SUCCESS:
      return true
    default:
      return state
  }
}

const isUpdating = (state: boolean = false, action: { type: string }) => {
  switch (action.type) {
    case CREATE_LOCATION_SUCCEEDED:
    case CREATE_LOCATION_FAILED:
    case LOCATION_UPDATE_SUCCEEDED:
    case LOCATION_UPDATE_FAILED:
      return false
    case CREATE_LOCATION_REQUESTED:
    case LOCATION_UPDATE_REQUESTED:
      return true
    default:
      return state
  }
}

const hasUpdated = (state: boolean = false, action: { type: string }) => {
  switch (action.type) {
    case CREATE_LOCATION_REQUESTED:
    case LOCATION_IS_FETCHING_DATA:
    case LOCATION_UPDATE_REQUESTED:
    case LOCATION_UPDATE_FAILED:
      return false
    case CREATE_LOCATION_SUCCEEDED:
    case LOCATION_UPDATE_SUCCEEDED:
      return true
    default:
      return state
  }
}

export const admin = combineReducers({
  data: locationReducer,
  meta: combineReducers({
    isFetching,
    hasErrored,
    hasLoaded,
    isUpdating,
    hasUpdated,
  }),
})
