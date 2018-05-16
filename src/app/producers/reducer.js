// @flow
import { combineReducers } from 'redux'
import { curry, compose, filter, equals, map, path, isEmpty } from 'ramda'

import {
  PRODUCERS_IS_FETCHING_DATA,
  PRODUCERS_FETCH_DATA_SUCCESS,
  PRODUCERS_FETCH_HAS_ERRORED,
} from './action-types'

import { getDistanceBetweenPoints } from './distances'

export const createMarker = (producer: Object) => ({
  lat: path(['location', 'coordinates'], producer)[1],
  lng: path(['location', 'coordinates'], producer)[0],
  title: path(['title'], producer),
})

export const getFurthestCoordinates = (producers: Array<Object>) =>
  path(['location', 'coordinates'], producers[producers.length - 1])

export const isAtProximity = (proximity: number, latitude: number, longitude: number, producer: Object) => { // eslint-disable-line max-len
  const { coordinates } = producer.location

  return equals(
    getDistanceBetweenPoints(latitude, longitude, coordinates[1], coordinates[0]),
    proximity,
  )
}

export const getProducersAtSearchProximity = (
  producers: Array<Object>,
  latitude: number,
  longitude: number,
) => {
  const furthestCoordinates = getFurthestCoordinates(producers)
  const proximity = getDistanceBetweenPoints(latitude, longitude, furthestCoordinates[1], furthestCoordinates[0]) // eslint-disable-line max-len
  const isAtSearchProximity = curry(isAtProximity)(proximity, latitude, longitude)

  const exclude = compose(
    map(path(['_id'])),
    filter(isAtSearchProximity),
  )(producers)

  return exclude
}

export const markers = (state: Array<Object> = [], action: { type: string, payload: any }) => {
  switch (action.type) {
    case PRODUCERS_FETCH_DATA_SUCCESS:
      return [...state, ...map(createMarker, action.payload)]
    default:
      return state
  }
}

export const producersReducer = (state: Array<Object> = [], action: { type: string, payload: any }) => { // eslint-disable-line max-len
  switch (action.type) {
    case PRODUCERS_FETCH_DATA_SUCCESS:
      return [...state, ...action.payload]
    default:
      return state
  }
}

export const searchProximity = (state: Array<number> = [0, 0], action: { type: string, payload: any }) => { // eslint-disable-line max-len
  switch (action.type) {
    case PRODUCERS_FETCH_DATA_SUCCESS:
      return isEmpty(action.payload) ? state : getFurthestCoordinates(action.payload)
    default:
      return state
  }
}

export const producersAtSearchProximity = (state: Array<string> = [], action: { type: string, payload: any, meta: Object }) => { // eslint-disable-line max-len
  switch (action.type) {
    case PRODUCERS_FETCH_DATA_SUCCESS:
      return isEmpty(action.payload)
        ? state
        : getProducersAtSearchProximity(action.payload, action.meta.latitude, action.meta.longitude)
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
    producers: producersReducer,
    markers,
    searchProximity,
    producersAtSearchProximity,
  }),
  meta: combineReducers({
    isFetching,
    hasErrored,
  }),
})
