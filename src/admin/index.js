import { routes as producerRoutes } from './producer'
import { routes as producersRoutes } from './producers'
import { routes as locationRoutes } from './locations'
import { reducer } from './reducers'

const routes = [
  ...producerRoutes,
  ...producersRoutes,
  ...locationRoutes,
]

export {
  routes,
  reducer,
}
