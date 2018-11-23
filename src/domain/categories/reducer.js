// @flow

import { combineReducers } from 'redux'
import {
  CATEGORIES_IS_FETCHING_DATA,
  CATEGORIES_FETCH_DATA_SUCCESS,
  CATEGORIES_FETCH_DATA_HAS_ERRORED,
} from './action-types'

const categories = (state: Array<Object> = [], action: { type: string, payload: any }) => {
  switch (action.type) {
    case CATEGORIES_FETCH_DATA_SUCCESS:
      return action.payload
    default:
      return state
  }
}

const isFetching = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case CATEGORIES_IS_FETCHING_DATA:
      return true
    case CATEGORIES_FETCH_DATA_HAS_ERRORED:
    case CATEGORIES_FETCH_DATA_SUCCESS:
      return false
    default:
      return state
  }
}

const hasErrored = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case CATEGORIES_IS_FETCHING_DATA:
    case CATEGORIES_FETCH_DATA_SUCCESS:
      return false
    case CATEGORIES_FETCH_DATA_HAS_ERRORED:
      return true
    default:
      return state
  }
}

const hasFetched = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case CATEGORIES_IS_FETCHING_DATA:
    case CATEGORIES_FETCH_DATA_HAS_ERRORED:
      return false
    case CATEGORIES_FETCH_DATA_SUCCESS:
      return true
    default:
      return state
  }
}

export const reducer = combineReducers({
  data: categories,
  meta: combineReducers({
    isFetching,
    hasErrored,
    hasFetched,
  }),
})
