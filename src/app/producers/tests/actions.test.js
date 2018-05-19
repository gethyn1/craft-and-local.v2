import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getProducers, loadMoreProducers, resetProducers } from '../actions'
import {
  PRODUCERS_IS_FETCHING_DATA,
  PRODUCERS_FETCH_DATA_SUCCESS,
  PRODUCERS_FETCH_HAS_ERRORED,
  PRODUCERS_RESET_DATA,
} from '../action-types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const mockGetProducersOnAPI = jest.fn(() => Promise.resolve({})) // eslint-disable-line

const service = {
  getProducers: mockGetProducersOnAPI,
}

const serviceWithError = {
  getProducers: () => Promise.reject(), // eslint-disable-line compat/compat
}

describe('producers > actions', () => {
  describe('get producers', () => {
    it('should handle a successful response from the API', (done) => {
      const store = mockStore()

      store.dispatch(getProducers(service)({ latitude: 1, longitude: 1, mindistance: 2, exclude: ['1'] }))
        .then(() => {
          expect(store.getActions()).toEqual([
            { type: PRODUCERS_IS_FETCHING_DATA, payload: true },
            {
              type: PRODUCERS_FETCH_DATA_SUCCESS,
              payload: {},
              meta: { latitude: 1, longitude: 1 },
            },
          ])

          done()
        })
    })

    it('should call the service with parameters for the search', () => {
      expect(mockGetProducersOnAPI.mock.calls[0][0]).toEqual({ latlng: '1,1', mindistance: 2, exclude: ['1'] })
    })

    it('should handle an error response from the API', (done) => {
      const store = mockStore()

      store.dispatch(getProducers(serviceWithError)({ latitude: 1, longitude: 1 }))
        .then(() => {
          expect(store.getActions()).toEqual([
            { type: PRODUCERS_IS_FETCHING_DATA, payload: true },
            { type: PRODUCERS_FETCH_HAS_ERRORED, payload: true },
          ])

          done()
        })
    })
  })

  describe('load more producers', () => {
    it('should handle a successful response from the API', (done) => {
      const store = mockStore()

      store.dispatch(loadMoreProducers(service)({ latitude: 1, longitude: 1, searchProximity: [1, 1], exclude: ['1'], categories: '1' }))
        .then(() => {
          expect(store.getActions()).toEqual([
            { type: PRODUCERS_IS_FETCHING_DATA, payload: true },
            {
              type: PRODUCERS_FETCH_DATA_SUCCESS,
              payload: {},
              meta: { latitude: 1, longitude: 1 },
            },
          ])

          done()
        })
    })

    it('should call the service with parameters for the search', () => {
      expect(mockGetProducersOnAPI.mock.calls[1][0]).toEqual({ latlng: '1,1', mindistance: 0, exclude: ['1'], categories: '1' })
    })
  })

  describe('reset producers', () => {
    it('should handle a reset producers action', () => {
      const store = mockStore()

      store.dispatch(resetProducers())
      expect(store.getActions()).toEqual([
        { type: PRODUCERS_RESET_DATA },
      ])
    })
  })
})
