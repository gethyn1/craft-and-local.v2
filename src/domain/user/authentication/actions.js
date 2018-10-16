// @flow

import {
  USER_AUTHENTICATION_REQUESTED,
  USER_AUTHENTICATION_FAILED,
  USER_AUTHENTICATION_SUCCEEDED,
} from './action-types'

import { handlePageError } from '../../../app/actions'
import api from '../../../services/api'

export const authenticateUser = (service: Object) => (email: String, password: String) => (dispatch: Function) => {
  dispatch({ type: USER_AUTHENTICATION_REQUESTED })

  return service.authenticateUser(email, password)
    .then((data) => {
      dispatch({ type: USER_AUTHENTICATION_SUCCEEDED, payload: data })
    })
    .catch(err =>
      dispatch(handlePageError(err, { type: USER_AUTHENTICATION_FAILED })))
}

export const authenticateUserWithAPI = authenticateUser(api)
