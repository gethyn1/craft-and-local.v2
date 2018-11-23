import { combineReducers } from 'redux'
import { producerReducer } from './producer'
import * as locations from './locations'
import { isFetching, hasErrored, hasUpdated } from './meta'

export const admin = combineReducers({
  data: producerReducer,
  locations: combineReducers({
    data: locations.locations,
    meta: combineReducers({
      isFetching: locations.isFetching,
      hasLoaded: locations.hasLoaded,
      hasErrored: locations.hasErrored,
    }),
  }),
  meta: combineReducers({
    isFetching,
    hasErrored,
    hasUpdated,
  }),
})
