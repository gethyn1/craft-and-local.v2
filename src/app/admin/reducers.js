import { combineReducers } from 'redux'
import { reducer as producer } from './producers'

export const reducer = combineReducers({
  producer,
})
