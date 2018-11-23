import { route as loginRoute } from './login'
import { routes as locationRoutes } from './locations'

export const routes = [
  loginRoute,
  ...locationRoutes,
]
