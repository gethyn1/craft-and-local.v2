// @flow

import * as track from 'common/analytics/events'
import { EMIT_ANALYTICS_EVENT } from '../../components/analytics/action-types'

export const trackPageNotFound = (path: string) => ({
  type: EMIT_ANALYTICS_EVENT,
  payload: track.pageNotFound(path),
})
