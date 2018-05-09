// @flow

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

const api = {
  getProducers: () =>
    fetch(`${API_URL}/producers`, { method: 'GET' })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data.data.producers)
      // eslint-disable-next-line no-console
      .catch(err => console.log(err)),

  getProducer: (id: String) =>
    fetch(`${API_URL}/producer/${String(id)}`, { method: 'GET' })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data)
      // eslint-disable-next-line no-console
      .catch(err => console.log(err)),
}

export default api
