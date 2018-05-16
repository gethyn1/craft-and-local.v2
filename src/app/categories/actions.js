// @flow

import {
  CATEGORIES_IS_FETCHING_DATA,
  CATEGORIES_FETCH_DATA_SUCCESS,
  CATEGORIES_FETCH_DATA_HAS_ERRORED,
} from './action-types'

import api from '../../services/api'

export const getCategories = (service: Object) => () => (dispatch: Function) => {
  dispatch({ type: CATEGORIES_IS_FETCHING_DATA, payload: true })

  return service.getCategories()
    .then((data) => {
      dispatch({ type: CATEGORIES_FETCH_DATA_SUCCESS, payload: data })
    })
    .catch(() => dispatch({ type: CATEGORIES_FETCH_DATA_HAS_ERRORED, payload: true }))
}

export const getCategoriesWithAPI = getCategories(api)
