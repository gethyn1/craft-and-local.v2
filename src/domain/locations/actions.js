// @flow

import { path } from 'ramda'
import * as track from 'common/analytics/events'
import {
  LOCATIONS_IS_FETCHING_DATA,
  LOCATIONS_FETCH_DATA_SUCCESS,
  LOCATIONS_FETCH_HAS_ERRORED,
  LOCATIONS_RESET_DATA,
} from './action-types'
import { EMIT_ANALYTICS_EVENT } from '../../components/analytics/action-types'

import api from '../../services/api'
import { locationsWithAssociatedProducer } from './adapters'
import { getDistanceBetweenPoints } from './distances'

type GetProps = {
  latitude: number,
  longitude: number,
  mindistance?: number,
  exclude?: Array<string>,
  categories?: string,
}

const trackProducerRenderedInResults = (userId: string, location: Object) => ({
  type: EMIT_ANALYTICS_EVENT,
  payload: track.producerRenderedInResults(userId, location),
})

const trackLoadMoreLocations = (category: ?string, count: ?number) => ({
  type: EMIT_ANALYTICS_EVENT,
  payload: track.loadMoreLocations(category, count),
})

export const getLocations = (service: Object) => ({
  latitude,
  longitude,
  mindistance,
  exclude,
  categories,
}: GetProps) => (dispatch: Function) => {
  dispatch({ type: LOCATIONS_IS_FETCHING_DATA, payload: true })

  return service.getLocations({ latlng: `${latitude},${longitude}`, mindistance, exclude, categories })
    .then((data) => {
      const locations = locationsWithAssociatedProducer(data)
      locations.map(location => dispatch(trackProducerRenderedInResults(path(['producer', 'userId'], location), location)))
      return dispatch({ type: LOCATIONS_FETCH_DATA_SUCCESS, payload: locations, meta: { latitude, longitude } })
    })
    .catch(() => dispatch({ type: LOCATIONS_FETCH_HAS_ERRORED, payload: true }))
}

type LoadProps = {
  latitude: number,
  longitude: number,
  searchProximity: Array<number>,
  exclude?: Array<string>,
  categories?: string,
  categorySlug?: string,
  count?: number,
}

export const loadMoreLocations = (service: Object) => ({
  latitude,
  longitude,
  searchProximity,
  exclude,
  categories,
  categorySlug,
  count,
}: LoadProps) => (dispatch: Function) => {
  const mindistance = getDistanceBetweenPoints(
    latitude,
    longitude,
    searchProximity[1],
    searchProximity[0],
  )

  dispatch(trackLoadMoreLocations(categorySlug, count))
  return dispatch(getLocations(service)({ latitude, longitude, mindistance, exclude, categories }))
}

export const resetLocations = () => (dispatch: Function) => dispatch({
  type: LOCATIONS_RESET_DATA,
})

export const getLocationsWithAPI = getLocations(api)
export const loadMoreLocationsWithAPI = loadMoreLocations(api)
