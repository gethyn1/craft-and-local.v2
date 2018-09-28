import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getLocation } from '../actions'
import {
  LOCATION_IS_FETCHING_DATA,
  LOCATION_FETCH_DATA_SUCCESS,
  LOCATION_FETCH_HAS_ERRORED,
} from '../action-types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const service = {
  getLocation: () => Promise.resolve({}), // eslint-disable-line compat/compat
}

const serviceWithError = {
  getLocation: () => Promise.reject(), // eslint-disable-line compat/compat
}

describe('location > actions > get producer', () => {
  it('should handle a successful response from the API', (done) => {
    const store = mockStore()

    store.dispatch(getLocation(service)('mockUserId'))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: LOCATION_IS_FETCHING_DATA, payload: true },
          { type: LOCATION_FETCH_DATA_SUCCESS, payload: {} },
        ])

        done()
      })
  })

  it('should handle an error response from the API', (done) => {
    const store = mockStore()

    store.dispatch(getLocation(serviceWithError)('mockUserId'))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: LOCATION_IS_FETCHING_DATA, payload: true },
          { type: LOCATION_FETCH_HAS_ERRORED, payload: true },
        ])

        done()
      })
  })
})
