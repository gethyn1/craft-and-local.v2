import { combineReducers } from 'redux'
import { reducer as producer } from './producer'
import { reducer as producers } from './producers'
import { reducer as location } from './locations'

export const reducer = combineReducers({
  producer,
  producers,
  location,
})
