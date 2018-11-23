// @flow

import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import trackAnalyticsEvents from '../components/analytics/middleware'
import { isProd } from '../config'

export const configureStore = (preloadedState: Object, reducer: Object) => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
  /* eslint-enable no-underscore-dangle */

  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(
      thunkMiddleware,
      trackAnalyticsEvents,
    )),
  )

  return store
}
