import { create } from './producers'
import { reducer } from './reducers'

const routes = [
  create.route,
]

export {
  routes,
  reducer,
}
