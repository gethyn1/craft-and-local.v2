import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { handlePageError } from '../actions'
import { PAGE_NOT_FOUND } from '../action-types'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const defaultAction = {
  type: 'DEFAULT_ACTION',
}

const notFoundError = Error('404')

describe('app > actions > handle page error', () => {
  it('should dispatch default action if no page error', () => {
    const store = mockStore()

    store.dispatch(handlePageError(null, defaultAction))
    expect(store.getActions()).toEqual([
      defaultAction,
    ])
  })

  it('should dispatch page not found on 404 error', () => {
    const store = mockStore()

    store.dispatch(handlePageError(notFoundError, defaultAction))
    expect(store.getActions()).toEqual([
      { type: PAGE_NOT_FOUND },
    ])
  })
})
