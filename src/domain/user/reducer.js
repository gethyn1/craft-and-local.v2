import { combineReducers } from 'redux'
import { reducer as location } from './location'

export const reducer = combineReducers({
  location,
})
