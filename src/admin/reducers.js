import { combineReducers } from 'redux'
import { reducer as producer } from './producer'
import { reducer as producers } from './producers'

export const reducer = combineReducers({
  producer,
  producers,
})
