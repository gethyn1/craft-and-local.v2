// @flow
import { combineReducers } from 'redux'
import {
  PRODUCER_IS_FETCHING_DATA,
  PRODUCER_FETCH_DATA_SUCCESS,
  PRODUCER_FETCH_HAS_ERRORED,
} from './action-types'

const producer = (state: ?Object = null, action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCER_FETCH_DATA_SUCCESS:
      return action.payload
    default:
      return state
  }
}

const isFetching = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCER_IS_FETCHING_DATA:
      return true
    case PRODUCER_FETCH_HAS_ERRORED:
    case PRODUCER_FETCH_DATA_SUCCESS:
      return false
    default:
      return state
  }
}

const hasErrored = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCER_IS_FETCHING_DATA:
    case PRODUCER_FETCH_DATA_SUCCESS:
      return false
    case PRODUCER_FETCH_HAS_ERRORED:
      return true
    default:
      return state
  }
}

export default combineReducers({
  data: producer,
  meta: combineReducers({
    isFetching,
    hasErrored,
  }),
})
