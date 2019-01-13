// @flow

import {
  CATEGORIES_IS_FETCHING_DATA,
  CATEGORIES_IS_CREATING,
  CATEGORIES_FETCH_DATA_SUCCESS,
  CATEGORIES_IS_CREATING_SUCCESS,
  CATEGORIES_FETCH_DATA_HAS_ERRORED,
  CATEGORIES_META_RESET,
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

export const createCategory = (service: Object) => (title: string, slug: string) => (dispatch: Function) => {
  dispatch({ type: CATEGORIES_IS_CREATING, payload: true })

  return service.createCategory(title, slug)
    .then((data) => {
      dispatch({ type: CATEGORIES_IS_CREATING_SUCCESS, payload: data })
    })
    .catch(() => dispatch({ type: CATEGORIES_FETCH_DATA_HAS_ERRORED, payload: true }))
}

export const resetCategoriesMeta = () => (dispatch: Function) => dispatch({
  type: CATEGORIES_META_RESET,
})

export const getCategoriesWithAPI = getCategories(api)
export const createCategoryWithAPI = createCategory(api)
