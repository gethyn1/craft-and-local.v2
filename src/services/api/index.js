// @flow

import { compose, toPairs, map, join, filter, isNil } from 'ramda'
import { API_URL } from '../../config'

const catchFetchError = (response: Object) => {
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error()
    }

    throw Error(response.statusText)
  }

  return response
}

const constructQueryString = compose(
  join('&'),
  map(join('=')),
  filter(param => !isNil(param[1])),
  toPairs,
)

type Params = {
  latLng?: string,
  mindistance?: number,
  exclude?: Array<string>,
}

const api = {
  getProducers: (params: Params) =>
    fetch(`${API_URL}/producers?${constructQueryString(params)}`, { method: 'GET' })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data.data.producers)
      // eslint-disable-next-line no-console
      .catch(err => console.log(err)),

  getProducer: (userId: String) =>
    fetch(`${API_URL}/producers/${String(userId)}`, { method: 'GET' })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data.data.producer)
      // eslint-disable-next-line no-console
      .catch(err => console.log(err)),
}

export default api
