import { combineReducers } from 'redux'
import {
  app,
  categories,
  geocoding,
  producer,
  producers,
  uploads,
  user,
  location,
  locations,
} from 'src/domain'

export const reducer = combineReducers({
  app: app.reducer,
  admin: combineReducers({
    producer: producer.reducers.admin,
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
