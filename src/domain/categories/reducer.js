// @flow

import { combineReducers } from 'redux'
import {
  CATEGORIES_IS_FETCHING_DATA,
  CATEGORIES_FETCH_DATA_SUCCESS,
  CATEGORIES_IS_CREATING,
  CATEGORIES_IS_CREATING_SUCCESS,
  CATEGORIES_FETCH_DATA_HAS_ERRORED,
  CATEGORIES_META_RESET,
} from './action-types'

const categories = (state: Array<Object> = [], action: { type: string, payload: any }) => {
  switch (action.type) {
    case CATEGORIES_FETCH_DATA_SUCCESS:
      return action.payload
    case CATEGORIES_IS_CREATING_SUCCESS:
      return [
        ...state,
        action.payload,
      ]
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
    case CATEGORIES_META_RESET:
      return false
    default:
      return state
  }
}

const isCreating = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case CATEGORIES_IS_CREATING:
      return true
    case CATEGORIES_FETCH_DATA_HAS_ERRORED:
    case CATEGORIES_IS_CREATING_SUCCESS:
    case CATEGORIES_META_RESET:
      return false
    default:
      return state
  }
}

const hasCreated = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case CATEGORIES_IS_CREATING_SUCCESS:
      return true
    case CATEGORIES_FETCH_DATA_HAS_ERRORED:
    case CATEGORIES_IS_CREATING:
    case CATEGORIES_META_RESET:
      return false
    default:
      return state
  }
}

const hasErrored = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case CATEGORIES_IS_FETCHING_DATA:
    case CATEGORIES_FETCH_DATA_SUCCESS:
    case CATEGORIES_IS_CREATING:
    case CATEGORIES_IS_CREATING_SUCCESS:
    case CATEGORIES_META_RESET:
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
    case CATEGORIES_META_RESET:
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
    isCreating,
    hasErrored,
    hasFetched,
    hasCreated,
  }),
})
