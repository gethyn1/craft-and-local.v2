import { routes as producerRoutes } from './producer'
import { routes as producersRoutes } from './producers'
import { reducer } from './reducers'

const routes = [
  ...producerRoutes,
  ...producersRoutes,
]

export {
  routes,
  reducer,
}
