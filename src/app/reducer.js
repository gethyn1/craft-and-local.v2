// @flow

import { combineReducers } from 'redux'
import { reducer as producers } from './producers'
import { reducer as userLocation } from './location/user'
import { reducer as producer } from './producer'
import { reducer as categories } from './categories'
import { TOGGLE_MODAL } from './action-types'

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

const appReducer = combineReducers({
  app: combineReducers({
    ui: combineReducers({
      modals,
    }),
  }),
  user: combineReducers({
    location: userLocation,
  }),
  domain: combineReducers({
    producers,
    producer,
    categories,
  }),
})

export default appReducer
