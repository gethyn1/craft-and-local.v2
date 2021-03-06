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
  producer?: string,
}

const api = {
  getLocations: (params: Params) =>
    fetch(`${API_URL}/locations?${constructQueryString(params)}`, { method: 'GET' })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data.data.locations)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error in service:', err)
        throw Error(err)
      }),

  getLocation: (id: String) =>
    fetch(`${API_URL}/locations/${String(id)}`, { method: 'GET' })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data.data.location)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error in service:', err)
        throw Error(err)
      }),

  createLocation: (location: Object) =>
    fetch(`${API_URL}/locations`, {
      method: 'POST',
      body: JSON.stringify(location),
      headers: createPostHeaders(true),
    })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data.data.location)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error in service:', err)
        throw Error(err)
      }),

  updateLocation: (id: string, location: Object) =>
    fetch(`${API_URL}/locations/${id}`, {
      method: 'POST',
      body: JSON.stringify(location),
      headers: createPostHeaders(true),
    })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data.data.location)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error in service:', err)
        throw Error(err)
      }),

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
      headers: createPostHeaders(true),
    })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data.data.producer)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error in service:', err)
        throw Error(err)
      }),

  updateProducer: (userId: string, producer: Object) =>
    fetch(`${API_URL}/producers/${userId}`, {
      method: 'POST',
      body: JSON.stringify(producer),
      headers: createPostHeaders(true),
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

  createCategory: (title: string, slug: string) =>
    fetch(`${API_URL}/categories`, {
      method: 'POST',
      body: JSON.stringify({ title, slug }),
      headers: createPostHeaders(true),
    })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data.data.category)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error in service:', err)
        throw Error(err)
      }),

  authenticateUser: (email: string, password: string) =>
    fetch(`${API_URL}/users/authenticate`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: createPostHeaders(),
    })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data.data)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error in service:', err)
        throw Error(err)
      }),

  uploadAvatar: (id: string, file: Object, userId: ?string = null) => {
    const formData = new FormData()
    formData.append(id, file)

    if (userId) {
      formData.append('userId', userId)
    }

    return fetch(`${API_URL}/avatars`, {
      method: 'POST',
      body: formData,
      headers: createPostHeaders(true, false),
    })
      .then(catchFetchError)
      .then(response => response.json())
      .then(data => data.data.url)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error in service:', err)
        throw Error(err)
      })
  },
}

export default api
