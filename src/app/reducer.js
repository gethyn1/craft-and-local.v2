// @flow

import { combineReducers } from 'redux'
import { geocoding, uploads, user, location, locations } from 'src/domain'
import { reducer as categories } from './categories'
import { reducer as admin } from '../admin'
import { TOGGLE_MODAL, PAGE_NOT_FOUND, RESET_PAGE_ERRORS } from './action-types'

const initialModalsState = {
  shareProducer: {
    isVisible: false,
  },
}

export const modals = (
  state: Object = initialModalsState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        [action.payload.modal]: {
          isVisible: action.payload.isVisible,
        },
      }
    default:
      return state
  }
}

const initialPageErrorsState = {
  pageNotFound: false,
  serverError: false,
}

export const pageErrors = (
  state: Object = initialPageErrorsState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case PAGE_NOT_FOUND:
      return {
        ...state,
        pageNotFound: true,
      }
    case RESET_PAGE_ERRORS:
      return initialPageErrorsState
    default:
      return state
  }
}

const appReducer = combineReducers({
  app: combineReducers({
    ui: combineReducers({
      modals,
      pageErrors,
    }),
  }),
  domain: combineReducers({
    geocoding: geocoding.reducer,
    uploads: uploads.reducer,
    user: user.reducer,
    admin,
    locations: locations.reducer,
    location: location.reducer,
    categories,
  }),
})

export default appReducer
