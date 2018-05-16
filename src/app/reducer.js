import { combineReducers } from 'redux'
import { reducer as producers } from './producers'
import { reducer as userLocation } from './location/user'
import { reducer as producer } from './producer'
import { reducer as categories } from './categories'

const appReducer = combineReducers({
  user: combineReducers({
    location: userLocation,
  }),
  domain: combineReducers({
    producers,
    producer,
    categories,
  }),
})

export default appReducer
