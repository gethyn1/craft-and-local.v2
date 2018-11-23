import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getCategories } from '../actions'
import {
  CATEGORIES_IS_FETCHING_DATA,
  CATEGORIES_FETCH_DATA_SUCCESS,
  CATEGORIES_FETCH_DATA_HAS_ERRORED,
} from '../action-types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const service = {
  getCategories: () => Promise.resolve([]), // eslint-disable-line compat/compat
}

const serviceWithError = {
  getCategories: () => Promise.reject(), // eslint-disable-line compat/compat
}

describe('producer > actions > get categories', () => {
  it('should handle a successful response from the API', (done) => {
    const store = mockStore()

    store.dispatch(getCategories(service)())
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: CATEGORIES_IS_FETCHING_DATA, payload: true },
          { type: CATEGORIES_FETCH_DATA_SUCCESS, payload: [] },
        ])

        done()
      })
  })

  it('should handle an error response from the API', (done) => {
    const store = mockStore()

    store.dispatch(getCategories(serviceWithError)('mockUserId'))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: CATEGORIES_IS_FETCHING_DATA, payload: true },
          { type: CATEGORIES_FETCH_DATA_HAS_ERRORED, payload: true },
        ])

        done()
      })
  })
})
