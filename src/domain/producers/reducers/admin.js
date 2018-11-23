// @flow
import { combineReducers } from 'redux'
import {
  PRODUCERS_FETCH_DATA_REQUESTED,
  PRODUCERS_FETCH_DATA_SUCCEEDED,
  PRODUCERS_FETCH_DATA_FAILED,
} from '../action-types'

const producersReducer = (state: ?Array<Object> = [], action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCERS_FETCH_DATA_SUCCEEDED:
      return action.payload
    default:
      return state
  }
}

const isLoading = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCERS_FETCH_DATA_REQUESTED:
      return true
    case PRODUCERS_FETCH_DATA_FAILED:
    case PRODUCERS_FETCH_DATA_SUCCEEDED:
      return false
    default:
      return state
  }
}
const hasLoaded = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCERS_FETCH_DATA_SUCCEEDED:
      return true
    case PRODUCERS_FETCH_DATA_FAILED:
    case PRODUCERS_FETCH_DATA_REQUESTED:
      return false
    default:
      return state
  }
}

const hasErrored = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCERS_FETCH_DATA_REQUESTED:
    case PRODUCERS_FETCH_DATA_SUCCEEDED:
      return false
    case PRODUCERS_FETCH_DATA_FAILED:
      return true
    default:
      return state
  }
}

export const admin = combineReducers({
  data: producersReducer,
  meta: combineReducers({
    isLoading,
    hasLoaded,
    hasErrored,
  }),
})
