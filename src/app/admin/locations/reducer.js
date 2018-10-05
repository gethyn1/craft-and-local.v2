// @flow

import { combineReducers } from 'redux'
import { location } from 'src/domain'

const {
  LOCATION_IS_FETCHING_DATA,
  LOCATION_FETCH_DATA_SUCCESS,
  LOCATION_FETCH_HAS_ERRORED,
  LOCATION_UPDATE_REQUESTED,
  LOCATION_UPDATE_SUCCEEDED,
  LOCATION_UPDATE_FAILED,
} = location.actionTypes

const locationProducer = (state: ?Array<Object> = null, action: { type: string, payload: any }) => {
  switch (action.type) {
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
    case LOCATION_FETCH_DATA_SUCCESS:
    case LOCATION_FETCH_HAS_ERRORED:
      return false
    default:
      return state
  }
}

const hasErrored = (state: boolean = false, action: { type: string }) => {
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
    case LOCATION_UPDATE_SUCCEEDED:
    case LOCATION_UPDATE_FAILED:
      return false
    case LOCATION_UPDATE_REQUESTED:
      return true
    default:
      return state
  }
}

const hasUpdated = (state: boolean = false, action: { type: string }) => {
  switch (action.type) {
    case LOCATION_UPDATE_REQUESTED:
    case LOCATION_UPDATE_FAILED:
      return false
    case LOCATION_UPDATE_SUCCEEDED:
      return true
    default:
      return state
  }
}

export const reducer = combineReducers({
  data: locationProducer,
  meta: combineReducers({
    isFetching,
    hasErrored,
    hasLoaded,
    isUpdating,
    hasUpdated,
  }),
})
