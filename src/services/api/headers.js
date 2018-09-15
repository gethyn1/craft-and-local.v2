// @flow

const setJSONHeaders = (headers: Object) => {
  headers.set('Content-Type', 'application/json')

  return null
}

const createPostHeaders = () => {
  const headers = new Headers()
  setJSONHeaders(headers)
  return headers
}

export {
  createPostHeaders,
}
