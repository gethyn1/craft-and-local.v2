// @flow

import { compose, toPairs, map, join, filter, isNil } from 'ramda'
import { API_URL } from '../../config'
import { createPostHeaders } from './headers'

const catchFetchError = (response: Object) =>
  new Promise((resolve, reject) => {
    if (!response.ok) {
      reject(response.status)
    }

    resolve(response)
  })

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
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error in service:', err)
        throw Error(err)
      }),

  getProducer: (userId: String) =>
    fetch(`${API_URL}/producers/${String(userId)}`, { method: 'GET' })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data.data.producer)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error in service:', err)
        throw Error(err)
      }),

  createProducer: (producer: Object) =>
    fetch(`${API_URL}/producers`, {
      method: 'POST',
      body: JSON.stringify(producer),
      headers: createPostHeaders(),
    })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data.data.producer)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error in service:', err)
        throw Error(err)
      }),

  getCategories: () =>
    fetch(`${API_URL}/categories`, { method: 'GET' })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data.data.categories)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error in service:', err)
        throw Error(err)
      }),
}

export default api
