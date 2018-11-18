// @flow
import { combineReducers } from 'redux'
import {
  USER_AUTHENTICATION_REQUESTED,
  USER_AUTHENTICATION_FAILED,
  USER_AUTHENTICATION_SUCCEEDED,
  USER_AUTHENTICATION_REFERRER_PATH_SET,
} from './action-types'

const authentication = (state: ?Object = null, action: { type: string, payload: any }) => {
  switch (action.type) {
    case USER_AUTHENTICATION_SUCCEEDED:
      return action.payload
    default:
      return state
  }
}

const isAuthenticating = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case USER_AUTHENTICATION_REQUESTED:
      return true
    case USER_AUTHENTICATION_FAILED:
    case USER_AUTHENTICATION_SUCCEEDED:
      return false
    default:
      return state
  }
}

const hasAuthenticated = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case USER_AUTHENTICATION_REQUESTED:
    case USER_AUTHENTICATION_FAILED:
      return false
    case USER_AUTHENTICATION_SUCCEEDED:
      return true
    default:
      return state
  }
}

const hasErrored = (state: boolean = false, action: { type: string, payload: any }) => {
  switch (action.type) {
    case USER_AUTHENTICATION_REQUESTED:
    case USER_AUTHENTICATION_SUCCEEDED:
      return false
    case USER_AUTHENTICATION_FAILED:
      return true
    default:
      return state
  }
}

const referrerPath = (state: ?string = null, action: { type: string, payload: any }) => {
  switch (action.type) {
    case USER_AUTHENTICATION_REFERRER_PATH_SET:
      return action.payload
    default:
      return state
  }
}

export const reducer = combineReducers({
  data: authentication,
  meta: combineReducers({
    isAuthenticating,
    hasErrored,
    hasAuthenticated,
    referrerPath,
  }),
})
