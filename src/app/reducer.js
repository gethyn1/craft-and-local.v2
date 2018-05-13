import { combineReducers } from 'redux'
import { reducer as producers } from './producers'
import { reducer as userLocation } from './location/user'
import { reducer as producer } from './producer'

const appReducer = combineReducers({
  user: combineReducers({
    location: userLocation,
  }),
  domain: combineReducers({
    producers,
    producer,
  }),
})

export default appReducer
