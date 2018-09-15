import { combineReducers } from 'redux'
import { create } from './producers'

export const reducer = combineReducers({
  producers: combineReducers({
    create: create.reducer,
  }),
})
