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

type GetProducersProps = {
  lat: string,
  lng: string,
}

const api = {
  getProducers: ({ lat, lng }: GetProducersProps) =>
    fetch(`${API_URL}/producers?latlng=${lat},${lng}`, { method: 'GET' })
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
