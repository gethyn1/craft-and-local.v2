// @flow

import { combineReducers } from 'redux'

import {
  CREATE_PRODUCER_REQUESTED,
  CREATE_PRODUCER_SUCCEEDED,
  CREATE_PRODUCER_HAS_ERRORED,
} from './action-types'

export const initialState = {
  isFetching: false,
  hasErrored: false,
}

const producer = (state: ?Object = null, action: { type: string, payload: any }) => {
  switch (action.type) {
    case CREATE_PRODUCER_SUCCEEDED:
      return action.payload
    default:
      return state
  }
}

const isFetching = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case CREATE_PRODUCER_REQUESTED:
      return true
    case CREATE_PRODUCER_SUCCEEDED:
    case CREATE_PRODUCER_HAS_ERRORED:
      return false
    default:
      return state
  }
}

const hasErrored = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case CREATE_PRODUCER_REQUESTED:
    case CREATE_PRODUCER_SUCCEEDED:
      return false
    case CREATE_PRODUCER_HAS_ERRORED:
      return true
    default:
      return state
  }
}

export const reducer = combineReducers({
  data: producer,
  meta: combineReducers({
    isFetching,
    hasErrored,
  }),
})
