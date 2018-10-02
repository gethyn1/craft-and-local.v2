// @flow

import {
  GET_LOCATIONS_FOR_PRODUCER_REQUESTED,
  GET_LOCATIONS_FOR_PRODUCER_SUCCEEDED,
  GET_LOCATIONS_FOR_PRODUCER_HAS_ERRORED,
} from '../action-types'

export const locations = (state: ?Array<Object> = null, action: { type: string, payload: any }) => {
  switch (action.type) {
    case GET_LOCATIONS_FOR_PRODUCER_SUCCEEDED:
      return action.payload
    default:
      return state
  }
}

export const isFetching = (state: boolean = false, action: { type: string }) => {
  switch (action.type) {
    case GET_LOCATIONS_FOR_PRODUCER_REQUESTED:
      return true
    case GET_LOCATIONS_FOR_PRODUCER_SUCCEEDED:
    case GET_LOCATIONS_FOR_PRODUCER_HAS_ERRORED:
      return false
    default:
      return state
  }
}

export const hasErrored = (state: boolean = false, action: { type: string }) => {
  switch (action.type) {
    case GET_LOCATIONS_FOR_PRODUCER_REQUESTED:
    case GET_LOCATIONS_FOR_PRODUCER_SUCCEEDED:
      return false
    case GET_LOCATIONS_FOR_PRODUCER_HAS_ERRORED:
      return true
    default:
      return state
  }
}

export const hasLoaded = (state: boolean = false, action: { type: string }) => {
  switch (action.type) {
    case GET_LOCATIONS_FOR_PRODUCER_REQUESTED:
    case GET_LOCATIONS_FOR_PRODUCER_HAS_ERRORED:
      return false
    case GET_LOCATIONS_FOR_PRODUCER_SUCCEEDED:
      return true
    default:
      return state
  }
}
