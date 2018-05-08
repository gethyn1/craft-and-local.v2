// @flow
import { combineReducers } from 'redux'
import {
  PRODUCERS_IS_FETCHING_DATA,
  PRODUCERS_FETCH_DATA_SUCCESS,
  PRODUCERS_FETCH_HAS_ERRORED,
} from './action-types'

const producersReducer = (state: Array<Object> = [], action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCERS_FETCH_DATA_SUCCESS:
      return [...action.payload]
    default:
      return state
  }
}

const isFetchingReducer = (state: Boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCERS_IS_FETCHING_DATA:
      return true
    case PRODUCERS_FETCH_HAS_ERRORED:
    case PRODUCERS_FETCH_DATA_SUCCESS:
      return false
    default:
      return state
  }
}

const hasErroredReducer = (state: Boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCERS_IS_FETCHING_DATA:
    case PRODUCERS_FETCH_DATA_SUCCESS:
      return false
    case PRODUCERS_FETCH_HAS_ERRORED:
      return true
    default:
      return state
  }
}

export default combineReducers({
  data: producersReducer,
  meta: combineReducers({
    isFetching: isFetchingReducer,
    hasErrored: hasErroredReducer,
  }),
})
