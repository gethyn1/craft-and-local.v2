// @flow
import { combineReducers } from 'redux'
import { curry, compose, filter, equals, map, path, isEmpty } from 'ramda'

import {
  LOCATIONS_IS_FETCHING_DATA,
  LOCATIONS_FETCH_DATA_SUCCESS,
  LOCATIONS_FETCH_HAS_ERRORED,
  LOCATIONS_RESET_DATA,
} from './action-types'

import { getDistanceBetweenPoints } from './distances'

export const createMarker = (location: Object) => ({
  lat: path(['location', 'coordinates'], location)[1],
  lng: path(['location', 'coordinates'], location)[0],
  title: path(['title'], location),
})

export const getFurthestCoordinates = (locations: Array<Object>) =>
  path(['location', 'coordinates'], locations[locations.length - 1])

export const isAtProximity = (proximity: number, latitude: number, longitude: number, location: Object) => { // eslint-disable-line max-len
  const { coordinates } = location.location

  return equals(
    getDistanceBetweenPoints(latitude, longitude, coordinates[1], coordinates[0]),
    proximity,
  )
}

export const getLocationsAtSearchProximity = (
  locations: Array<Object>,
  latitude: number,
  longitude: number,
) => {
  const furthestCoordinates = getFurthestCoordinates(locations)
  const proximity = getDistanceBetweenPoints(latitude, longitude, furthestCoordinates[1], furthestCoordinates[0]) // eslint-disable-line max-len
  const isAtSearchProximity = curry(isAtProximity)(proximity, latitude, longitude)

  const exclude = compose(
    map(path(['_id'])),
    filter(isAtSearchProximity),
  )(locations)

  return exclude
}

export const markers = (state: Array<Object> = [], action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOCATIONS_FETCH_DATA_SUCCESS:
      return [...state, ...map(createMarker, action.payload)]
    case LOCATIONS_RESET_DATA:
      return []
    default:
      return state
  }
}

export const locationsReducer = (state: Array<Object> = [], action: { type: string, payload: any }) => { // eslint-disable-line max-len
  switch (action.type) {
    case LOCATIONS_FETCH_DATA_SUCCESS:
      return [...state, ...action.payload]
    case LOCATIONS_RESET_DATA:
      return []
    default:
      return state
  }
}

export const searchProximity = (state: Array<number> = [0, 0], action: { type: string, payload: any }) => { // eslint-disable-line max-len
  switch (action.type) {
    case LOCATIONS_FETCH_DATA_SUCCESS:
      return isEmpty(action.payload) ? state : getFurthestCoordinates(action.payload)
    default:
      return state
  }
}

export const locationsAtSearchProximity = (state: Array<string> = [], action: { type: string, payload: any, meta: Object }) => { // eslint-disable-line max-len
  switch (action.type) {
    case LOCATIONS_FETCH_DATA_SUCCESS:
      return isEmpty(action.payload)
        ? state
        : getLocationsAtSearchProximity(action.payload, action.meta.latitude, action.meta.longitude)
    default:
      return state
  }
}

export const noMoreLocations = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOCATIONS_IS_FETCHING_DATA:
    case LOCATIONS_FETCH_HAS_ERRORED:
      return false
    case LOCATIONS_FETCH_DATA_SUCCESS:
      return isEmpty(action.payload)
    default:
      return state
  }
}

const isFetching = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOCATIONS_IS_FETCHING_DATA:
      return true
    case LOCATIONS_FETCH_HAS_ERRORED:
    case LOCATIONS_FETCH_DATA_SUCCESS:
      return false
    default:
      return state
  }
}

const hasErrored = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case LOCATIONS_IS_FETCHING_DATA:
    case LOCATIONS_FETCH_DATA_SUCCESS:
      return false
    case LOCATIONS_FETCH_HAS_ERRORED:
      return true
    default:
      return state
  }
}

export const reducer = combineReducers({
  data: combineReducers({
    locations: locationsReducer,
    markers,
    searchProximity,
    locationsAtSearchProximity,
  }),
  meta: combineReducers({
    noMoreLocations,
    isFetching,
    hasErrored,
  }),
})
