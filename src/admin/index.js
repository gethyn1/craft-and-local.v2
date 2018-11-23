import { routes as producerRoutes } from './producer'
import { reducer } from './reducers'

const routes = [
  ...producerRoutes,
]

export {
  routes,
  reducer,
}
