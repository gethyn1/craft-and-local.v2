// @flow

import { omit } from 'ramda'
import { STORAGE_JSON_WEB_TOKEN } from '../../../config'

import {
  USER_AUTHENTICATION_REQUESTED,
  USER_AUTHENTICATION_FAILED,
  USER_AUTHENTICATION_SUCCEEDED,
  USER_AUTHENTICATION_REFERRER_PATH_SET,
} from './action-types'

import { handlePageError } from '../../../app/actions'
import api from '../../../services/api'

export const authenticateUser = (service: Object) => (email: String, password: String) => (dispatch: Function) => {
  dispatch({ type: USER_AUTHENTICATION_REQUESTED })

  return service.authenticateUser(email, password)
    .then((data) => {
      sessionStorage.setItem(STORAGE_JSON_WEB_TOKEN, data.token)

      dispatch({ type: USER_AUTHENTICATION_SUCCEEDED, payload: omit(['token'], data) })
    })
    .catch(err =>
      dispatch(handlePageError(err, { type: USER_AUTHENTICATION_FAILED })))
}

export const setAuthenticationReferrerPath = (payload: ?string) => ({
  type: USER_AUTHENTICATION_REFERRER_PATH_SET,
  payload,
})

export const authenticateUserWithAPI = authenticateUser(api)
