import { combineReducers } from 'redux'
import { reducer as authentication } from './authentication'
import { reducer as location } from './location'

export const reducer = combineReducers({
  authentication,
  location,
})
