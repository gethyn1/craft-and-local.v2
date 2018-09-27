// @flow

const setJSONHeaders = (headers: Object) => {
  headers.set('Content-Type', 'application/json')

  return null
}

const createPostHeaders = (JSON: boolean = false) => {
  const headers = new Headers()

  if (JSON) {
    setJSONHeaders(headers)
  }

  setJSONHeaders(headers)
  return headers
}

export {
  createPostHeaders,
}
