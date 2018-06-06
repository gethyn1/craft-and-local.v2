// @flow

import * as track from 'common/analytics/events'
import {
  PRODUCERS_IS_FETCHING_DATA,
  PRODUCERS_FETCH_DATA_SUCCESS,
  PRODUCERS_FETCH_HAS_ERRORED,
  PRODUCERS_RESET_DATA,
} from './action-types'

import api from '../../services/api'
import { getDistanceBetweenPoints } from './distances'

type GetProps = {
  latitude: number,
  longitude: number,
  mindistance?: number,
  exclude?: Array<string>,
  categories?: string,
}

export const getProducers = (service: Object) => ({
  latitude,
  longitude,
  mindistance,
  exclude,
  categories,
}: GetProps) => (dispatch: Function) => {
  dispatch({ type: PRODUCERS_IS_FETCHING_DATA, payload: true })

  return service.getProducers({ latlng: `${latitude},${longitude}`, mindistance, exclude, categories })
    .then((data) => {
      data.map(producer => track.producerRenderedInResults(producer.user_id))
      return dispatch({ type: PRODUCERS_FETCH_DATA_SUCCESS, payload: data, meta: { latitude, longitude } })
    })
    .catch(() => dispatch({ type: PRODUCERS_FETCH_HAS_ERRORED, payload: true }))
}

type LoadProps = {
  latitude: number,
  longitude: number,
  searchProximity: Array<number>,
  exclude?: Array<string>,
  categories?: string,
}

export const loadMoreProducers = (service: Object) => ({
  latitude,
  longitude,
  searchProximity,
  exclude,
  categories,
}: LoadProps) => (dispatch: Function) => {
  const mindistance = getDistanceBetweenPoints(
    latitude,
    longitude,
    searchProximity[1],
    searchProximity[0],
  )

  return dispatch(getProducers(service)({ latitude, longitude, mindistance, exclude, categories }))
}

export const resetProducers = () => (dispatch: Function) => dispatch({
  type: PRODUCERS_RESET_DATA,
})

export const getProducersWithAPI = getProducers(api)
export const loadMoreProducersWithAPI = loadMoreProducers(api)
