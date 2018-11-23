import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as track from 'common/analytics/events'
import { getLocations, loadMoreLocations, resetLocations } from '../actions'
import {
  LOCATIONS_IS_FETCHING_DATA,
  LOCATIONS_FETCH_DATA_SUCCESS,
  LOCATIONS_FETCH_HAS_ERRORED,
  LOCATIONS_RESET_DATA,
} from '../action-types'
import { EMIT_ANALYTICS_EVENT } from '../../../components/analytics/action-types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const mockGetLocationsOnAPI = jest.fn(() => Promise.resolve([])) // eslint-disable-line

const service = {
  getLocations: mockGetLocationsOnAPI,
}

const serviceWithError = {
  getLocations: () => Promise.reject(), // eslint-disable-line compat/compat
}

describe('locations > actions', () => {
  describe('get locations', () => {
    it('should handle a successful response from the API', (done) => {
      const store = mockStore()

      store.dispatch(getLocations(service)({ latitude: 1, longitude: 1, mindistance: 2, exclude: ['1'] }))
        .then(() => {
          expect(store.getActions()).toEqual([
            { type: LOCATIONS_IS_FETCHING_DATA, payload: true },
            {
              type: LOCATIONS_FETCH_DATA_SUCCESS,
              payload: [],
              meta: { latitude: 1, longitude: 1 },
            },
          ])

          done()
        })
    })

    it('should call the service with parameters for the search', () => {
      expect(mockGetLocationsOnAPI.mock.calls[0][0]).toEqual({ latlng: '1,1', mindistance: 2, exclude: ['1'] })
    })

    it('should handle an error response from the API', (done) => {
      const store = mockStore()

      store.dispatch(getLocations(serviceWithError)({ latitude: 1, longitude: 1 }))
        .then(() => {
          expect(store.getActions()).toEqual([
            { type: LOCATIONS_IS_FETCHING_DATA, payload: true },
            { type: LOCATIONS_FETCH_HAS_ERRORED, payload: true },
          ])

          done()
        })
    })
  })

  describe('load more locations', () => {
    it('should handle a successful response from the API', (done) => {
      const store = mockStore()

      store.dispatch(loadMoreLocations(service)({ latitude: 1, longitude: 1, searchProximity: [1, 1], exclude: ['1'], categories: '1' }))
        .then(() => {
          expect(store.getActions()).toEqual([
            { type: EMIT_ANALYTICS_EVENT, payload: track.loadMoreLocations() },
            { type: LOCATIONS_IS_FETCHING_DATA, payload: true },
            {
              type: LOCATIONS_FETCH_DATA_SUCCESS,
              payload: [],
              meta: { latitude: 1, longitude: 1 },
            },
          ])

          done()
        })
    })

    it('should call the service with parameters for the search', () => {
      expect(mockGetLocationsOnAPI.mock.calls[1][0]).toEqual({ latlng: '1,1', mindistance: 0, exclude: ['1'], categories: '1' })
    })
  })

  describe('reset locations', () => {
    it('should handle a reset locations action', () => {
      const store = mockStore()

      store.dispatch(resetLocations())
      expect(store.getActions()).toEqual([
        { type: LOCATIONS_RESET_DATA },
      ])
    })
  })
})
