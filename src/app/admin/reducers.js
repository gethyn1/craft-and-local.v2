import { combineReducers } from 'redux'
import { reducer as producer } from './producers'
import { reducer as location } from './locations'

export const reducer = combineReducers({
  producer,
  location,
})
