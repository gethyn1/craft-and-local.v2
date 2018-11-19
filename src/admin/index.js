import { routes as producerRoutes } from './producer'
import { routes as producersRoutes } from './producers'
import { routes as locationRoutes } from './locations'
import { routes as loginRoutes } from './login'
import { reducer } from './reducers'

const routes = [
  ...producerRoutes,
  ...producersRoutes,
  ...locationRoutes,
  ...loginRoutes,
]

export {
  routes,
  reducer,
}
