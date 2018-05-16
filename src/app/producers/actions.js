// @flow

import {
  PRODUCERS_IS_FETCHING_DATA,
  PRODUCERS_FETCH_DATA_SUCCESS,
  PRODUCERS_FETCH_HAS_ERRORED,
} from './action-types'

import api from '../../services/api'
import { getDistanceBetweenPoints } from './distances'

type GetProps = {
  latitude: number,
  longitude: number,
  mindistance?: number,
  exclude?: Array<string>,
}

const getProducers = ({
  latitude,
  longitude,
  mindistance,
  exclude,
}: GetProps) => (dispatch: Function) => {
  dispatch({ type: PRODUCERS_IS_FETCHING_DATA, payload: true })

  return api.getProducers({ latlng: `${latitude},${longitude}`, mindistance, exclude })
    .then((data) => {
      dispatch({ type: PRODUCERS_FETCH_DATA_SUCCESS, payload: data, meta: { latitude, longitude } })
    })
    .catch(() => dispatch({ type: PRODUCERS_FETCH_HAS_ERRORED, payload: true }))
}

type LoadProps = {
  latitude: number,
  longitude: number,
  searchProximity: Array<number>,
  exclude?: Array<string>,
}

const loadMoreProducers = ({
  latitude,
  longitude,
  searchProximity,
  exclude,
}: LoadProps) => (dispatch: Function) => {
  const mindistance = getDistanceBetweenPoints(
    latitude,
    longitude,
    searchProximity[1],
    searchProximity[0],
  )
  dispatch(getProducers({ latitude, longitude, mindistance, exclude }))
}

export default {
  getProducers,
  loadMoreProducers,
}
