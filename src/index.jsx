import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import ReactGA from 'react-ga'

import { reducer as coreReducer, App, configureStore, loadState } from './core'
import { GA_DEBUG, GA_ID } from './config'

// eslint-disable-next-line
import sass from './common/styles/style.scss'

// Google Analytics
ReactGA.initialize(GA_ID, {
  debug: GA_DEBUG,
})

// Get persisted state from local storage and create store
const persistedState = loadState()
const store = configureStore(persistedState, coreReducer)
const rootNode = document.getElementById('app')

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(wrapApp(App, store), rootNode)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('./core', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./core').App
    ReactDOM.render(wrapApp(NextApp, store), rootNode)
  })
}
