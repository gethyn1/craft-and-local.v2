// @flow

import { STORAGE_JSON_WEB_TOKEN } from '../../config'

const setAuthHeaders = (headers: Object, key: string) => {
  const jwtToken = sessionStorage.getItem(key)

  if (jwtToken !== null) {
    headers.set('Authorization', jwtToken)
  }

  return null
}

const setJSONHeaders = (headers: Object) => {
  headers.set('Content-Type', 'application/json')

  return null
}

const createPostHeaders = (authenticate: boolean = false, JSON: boolean = true) => {
  const headers = new Headers()

  if (JSON) {
    setJSONHeaders(headers)
  }

  if (authenticate) {
    setAuthHeaders(headers, STORAGE_JSON_WEB_TOKEN)
  }

  return headers
}

export {
  createPostHeaders,
}
