import { route as loginRoute } from './login'
import { routes as locationRoutes } from './locations'
import { routes as producersRoutes } from './producers'

export const routes = [
  loginRoute,
  ...locationRoutes,
  ...producersRoutes,
]
