// @flow

import {
  UPLOAD_REQUESTED,
  UPLOAD_SUCCEEDED,
  UPLOAD_HAS_ERRORED,
} from './action-types'

import api from '../../services/api'
import { actions } from '../app'

const uploadFile = (service: Object) => (id: string, file: Object, userId: ?string) => (dispatch: Function) => {
  dispatch({
    type: UPLOAD_REQUESTED,
    payload: { id },
  })

  return service.uploadAvatar(id, file, userId)
    .then((data) => {
      dispatch({
        type: UPLOAD_SUCCEEDED,
        payload: {
          id,
          filename: data,
        },
      })
    })
    .catch(err =>
      dispatch(actions.handlePageError(err, {
        type: UPLOAD_HAS_ERRORED,
        payload: { id },
      })))
}

export const uploadFileWithAPI = uploadFile(api)
