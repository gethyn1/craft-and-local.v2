// @flow

import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { isProd } from '../config'

const configureStore = (preloadedState: Object, reducer: Object) => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  /* eslint-enable no-underscore-dangle */

  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
  )

  return store
}

export default configureStore
