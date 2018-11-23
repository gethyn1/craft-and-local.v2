import { combineReducers } from 'redux'
import {
  app,
  categories,
  geocoding,
  producers,
  uploads,
  user,
  location,
  locations,
} from 'src/domain'
import { reducer as admin } from '../admin'

export const reducer = combineReducers({
  app: app.reducer,
  admin: combineReducers({
    ...admin,
    producers: producers.reducers.admin,
    location: location.reducers.admin,
  }),
  domain: combineReducers({
    categories: categories.reducer,
    geocoding: geocoding.reducer,
    uploads: uploads.reducer,
    user: user.reducer,
    locations: locations.reducer,
    location: location.reducers.reducer,
  }),
})
