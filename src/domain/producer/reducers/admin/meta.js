// @flow

import {
  CREATE_PRODUCER_REQUESTED,
  CREATE_PRODUCER_SUCCEEDED,
  CREATE_PRODUCER_HAS_ERRORED,
  UPDATE_PRODUCER_REQUESTED,
  UPDATE_PRODUCER_SUCCEEDED,
  UPDATE_PRODUCER_HAS_ERRORED,
  PRODUCER_IS_FETCHING_DATA,
  PRODUCER_FETCH_DATA_SUCCESS,
  PRODUCER_FETCH_HAS_ERRORED,
} from '../../action-types'

export const isFetching = (state: boolean = false, action: { type: string }) => {
  switch (action.type) {
    case CREATE_PRODUCER_REQUESTED:
    case UPDATE_PRODUCER_REQUESTED:
    case PRODUCER_IS_FETCHING_DATA:
      return true
    case CREATE_PRODUCER_SUCCEEDED:
    case CREATE_PRODUCER_HAS_ERRORED:
    case UPDATE_PRODUCER_SUCCEEDED:
    case UPDATE_PRODUCER_HAS_ERRORED:
    case PRODUCER_FETCH_HAS_ERRORED:
    case PRODUCER_FETCH_DATA_SUCCESS:
      return false
    default:
      return state
  }
}

export const hasErrored = (state: boolean = false, action: { type: string }) => {
  switch (action.type) {
    case CREATE_PRODUCER_REQUESTED:
    case CREATE_PRODUCER_SUCCEEDED:
    case UPDATE_PRODUCER_REQUESTED:
    case UPDATE_PRODUCER_SUCCEEDED:
    case PRODUCER_IS_FETCHING_DATA:
    case PRODUCER_FETCH_DATA_SUCCESS:
      return false
    case CREATE_PRODUCER_HAS_ERRORED:
    case UPDATE_PRODUCER_HAS_ERRORED:
    case PRODUCER_FETCH_HAS_ERRORED:
      return true
    default:
      return state
  }
}

export const hasUpdated = (state: boolean = false, action: { type: string }) => {
  switch (action.type) {
    case CREATE_PRODUCER_REQUESTED:
    case CREATE_PRODUCER_HAS_ERRORED:
    case UPDATE_PRODUCER_REQUESTED:
    case UPDATE_PRODUCER_HAS_ERRORED:
    case PRODUCER_IS_FETCHING_DATA:
    case PRODUCER_FETCH_DATA_SUCCESS:
    case PRODUCER_FETCH_HAS_ERRORED:
      return false
    case CREATE_PRODUCER_SUCCEEDED:
    case UPDATE_PRODUCER_SUCCEEDED:
      return true
    default:
      return state
  }
}
