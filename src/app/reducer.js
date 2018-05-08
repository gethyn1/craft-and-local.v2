import { combineReducers } from 'redux'
import { reducer as producers } from './producers'
import { reducer as userLocation } from './location/user'

const appReducer = combineReducers({
  user: combineReducers({
    location: userLocation,
  }),
  domain: combineReducers({
    producers,
  }),
})

export default appReducer
