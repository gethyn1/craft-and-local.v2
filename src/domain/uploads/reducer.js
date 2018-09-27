// @flow

import { combineReducers } from 'redux'

import {
  UPLOAD_REQUESTED,
  UPLOAD_SUCCEEDED,
  UPLOAD_HAS_ERRORED,
} from './action-types'

const isFetching = (state: Array<string> = [], action: { type: string, payload: { id: string, filename: string } }) => {
  switch (action.type) {
    case UPLOAD_REQUESTED:
      return [...state, action.payload.id]
    case UPLOAD_SUCCEEDED:
    case UPLOAD_HAS_ERRORED:
      return state.filter(id => id !== action.payload.id)
    default:
      return state
  }
}

const hasErrored = (state: Array<string> = [], action: { type: string, payload: { id: string, filename: string } }) => {
  switch (action.type) {
    case UPLOAD_HAS_ERRORED:
      return [...state, action.payload.id]
    case UPLOAD_SUCCEEDED:
    case UPLOAD_REQUESTED:
      return state.filter(id => id !== action.payload.id)
    default:
      return state
  }
}

const uploads = (state: Array<Object> = [], action: { type: string, payload: { id: string, filename: string } }) => {
  switch (action.type) {
    case UPLOAD_SUCCEEDED:
      return [...state.filter(upload => upload.id !== action.payload.id), action.payload]
    default:
      return state
  }
}

export const reducer = combineReducers({
  data: uploads,
  meta: combineReducers({
    isFetching,
    hasErrored,
  }),
})
