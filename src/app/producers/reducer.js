// @flow
import { combineReducers } from 'redux'
import { map } from 'ramda'
import {
  PRODUCERS_IS_FETCHING_DATA,
  PRODUCERS_FETCH_DATA_SUCCESS,
  PRODUCERS_FETCH_HAS_ERRORED,
} from './action-types'

const producers = (state: Array<Object> = [], action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCERS_FETCH_DATA_SUCCESS:
      return [...action.payload]
    default:
      return state
  }
}

const createMarker = (producer: Object) => ({
  lat: producer.location.coordinates[1],
  lng: producer.location.coordinates[0],
  title: producer.title,
})

const markers = (state: Array<Object> = [], action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCERS_FETCH_DATA_SUCCESS:
      return map(createMarker, action.payload)
    default:
      return state
  }
}

const isFetching = (state: boolean = false, action: { type: string, payload: any }) => {
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

const hasErrored = (state: boolean = false, action: { type: string, payload: any }) => {
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
  data: combineReducers({
    producers,
    markers,
  }),
  meta: combineReducers({
    isFetching,
    hasErrored,
  }),
})
