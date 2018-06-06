// @flow

import ReactGA from 'react-ga'
import { EMIT_ANALYTICS_EVENT } from './action-types'

const trackAnalyticsEvents = () => (next: Function) => (action: Object) => {
  if (action.type === EMIT_ANALYTICS_EVENT) {
    ReactGA.event(action.payload)
  }

  return next(action)
}

export default trackAnalyticsEvents
