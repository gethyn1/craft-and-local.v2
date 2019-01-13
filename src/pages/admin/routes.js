import { route as loginRoute } from './login'
import { routes as locationRoutes } from './locations'
import { routes as producerRoutes } from './producer'
import { routes as producersRoutes } from './producers'
import { routes as categoriesRoutes } from './categories'

export const routes = [
  loginRoute,
  ...locationRoutes,
  ...producerRoutes,
  ...producersRoutes,
  ...categoriesRoutes,
]
