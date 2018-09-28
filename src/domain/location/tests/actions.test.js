import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getProducer } from '../actions'
import {
  PRODUCER_IS_FETCHING_DATA,
  PRODUCER_FETCH_DATA_SUCCESS,
  PRODUCER_FETCH_HAS_ERRORED,
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

    store.dispatch(getProducer(service)('mockUserId'))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: PRODUCER_IS_FETCHING_DATA, payload: true },
          { type: PRODUCER_FETCH_DATA_SUCCESS, payload: {} },
        ])

        done()
      })
  })

  it('should handle an error response from the API', (done) => {
    const store = mockStore()

    store.dispatch(getProducer(serviceWithError)('mockUserId'))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: PRODUCER_IS_FETCHING_DATA, payload: true },
          { type: PRODUCER_FETCH_HAS_ERRORED, payload: true },
        ])

        done()
      })
  })
})
