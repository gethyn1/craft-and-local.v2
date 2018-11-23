// @flow

import * as track from 'common/analytics/events'
import { EMIT_ANALYTICS_EVENT } from '../../components/analytics/action-types'

export const trackShareProducerModal = (userId: string) => ({
  type: EMIT_ANALYTICS_EVENT,
  payload: track.shareProducerModal(userId),
})

export const trackProducerMetaLink = (type: string, userId: string) => ({
  type: EMIT_ANALYTICS_EVENT,
  payload: track.producerMetaLink(type, userId),
})

export const trackShareProducerButton = (type: string, userId: string) => ({
  type: EMIT_ANALYTICS_EVENT,
  payload: track.shareProducerButton(type, userId),
})
