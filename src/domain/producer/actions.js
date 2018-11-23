// @flow

import { app } from 'src/domain'
import {
  PRODUCER_IS_FETCHING_DATA,
  PRODUCER_FETCH_DATA_SUCCESS,
  PRODUCER_FETCH_HAS_ERRORED,
  CREATE_PRODUCER_REQUESTED,
  CREATE_PRODUCER_SUCCEEDED,
  CREATE_PRODUCER_HAS_ERRORED,
  UPDATE_PRODUCER_REQUESTED,
  UPDATE_PRODUCER_SUCCEEDED,
  UPDATE_PRODUCER_HAS_ERRORED,
  GET_LOCATIONS_FOR_PRODUCER_REQUESTED,
  GET_LOCATIONS_FOR_PRODUCER_SUCCEEDED,
  GET_LOCATIONS_FOR_PRODUCER_HAS_ERRORED,
  PRODUCER_DATA_RESET,
} from './action-types'

import api from '../../services/api'
import { actions } from '../app'

export const getProducer = (service: Object) => (userId: String) => (dispatch: Function) => {
  dispatch({ type: PRODUCER_IS_FETCHING_DATA, payload: true })

  return service.getProducer(userId)
    .then((data) => {
      dispatch({ type: PRODUCER_FETCH_DATA_SUCCESS, payload: data })
    })
    .catch(err =>
      dispatch(actions.handlePageError(err, { type: PRODUCER_FETCH_HAS_ERRORED, payload: true })))
}

export const createProducer = (service: Object) => (producer: Object) => (dispatch: Function) => {
  dispatch({ type: CREATE_PRODUCER_REQUESTED })

  return service.createProducer(producer)
    .then((data) => {
      dispatch({ type: CREATE_PRODUCER_SUCCEEDED, payload: data })
    })
    .catch(err =>
      dispatch(app.actions.handlePageError(err, { type: CREATE_PRODUCER_HAS_ERRORED })))
}

export const updateProducer = (service: Object) => (userId: string, producer: Object) => (dispatch: Function) => {
  dispatch({ type: UPDATE_PRODUCER_REQUESTED })

  return service.updateProducer(userId, producer)
    .then((data) => {
      dispatch({ type: UPDATE_PRODUCER_SUCCEEDED, payload: data })
    })
    .catch(err =>
      dispatch(app.actions.handlePageError(err, { type: UPDATE_PRODUCER_HAS_ERRORED })))
}

export const getLocationsForProducer = (service: Object) => (id: string) => (dispatch: Function) => {
  dispatch({ type: GET_LOCATIONS_FOR_PRODUCER_REQUESTED })

  return service.getLocations({ producer: id })
    .then((data) => {
      dispatch({ type: GET_LOCATIONS_FOR_PRODUCER_SUCCEEDED, payload: data })
    })
    .catch(err =>
      dispatch(app.actions.handlePageError(err, { type: GET_LOCATIONS_FOR_PRODUCER_HAS_ERRORED })))
}

export const resetProducer = () => (dispatch: Function) => dispatch({ type: PRODUCER_DATA_RESET })

export const getProducerWithAPI = getProducer(api)
export const createProducerWithAPI = createProducer(api)
export const updateProducerWithAPI = updateProducer(api)
export const getLocationsForProducerWithAPI = getLocationsForProducer(api)
