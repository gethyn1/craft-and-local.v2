import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import ReactGA from 'react-ga'

import configureStore from './core/configure-store'
import { loadState } from './core/local-storage'
import appReducer from './pages/reducer'
import { GA_DEBUG, GA_ID } from './config'

import App from './pages'

// eslint-disable-next-line
import sass from './common/styles/style.scss'

// Google Analytics
ReactGA.initialize(GA_ID, {
  debug: GA_DEBUG,
})

// Get persisted state from local storage and create store
const persistedState = loadState()
const store = configureStore(persistedState, appReducer)
const rootEl = document.getElementById('app')

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(wrapApp(App, store), rootEl)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./pages', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./pages').default
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}
