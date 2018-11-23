// @flow

import {
  CREATE_PRODUCER_SUCCEEDED,
  UPDATE_PRODUCER_SUCCEEDED,
  PRODUCER_DATA_RESET,
  PRODUCER_FETCH_DATA_SUCCESS,
} from '../../action-types'

export const producerReducer = (state: ?Object = null, action: { type: string, payload: any }) => {
  switch (action.type) {
    case CREATE_PRODUCER_SUCCEEDED:
    case UPDATE_PRODUCER_SUCCEEDED:
    case PRODUCER_FETCH_DATA_SUCCESS:
      return action.payload
    case PRODUCER_DATA_RESET:
      return null
    default:
      return state
  }
}
