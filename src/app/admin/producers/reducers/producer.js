// @flow

import { producer } from 'src/domain'
import { CREATE_PRODUCER_SUCCEEDED, UPDATE_PRODUCER_SUCCEEDED } from '../action-types'

const { PRODUCER_FETCH_DATA_SUCCESS } = producer.actionTypes

export const producerReducer = (state: ?Object = null, action: { type: string, payload: any }) => {
  switch (action.type) {
    case CREATE_PRODUCER_SUCCEEDED:
    case UPDATE_PRODUCER_SUCCEEDED:
    case PRODUCER_FETCH_DATA_SUCCESS:
      return action.payload
    default:
      return state
  }
}
