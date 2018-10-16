import { routes as producerRoutes } from './producers'
import { routes as locationRoutes } from './locations'
import { routes as loginRoutes } from './login'
import { reducer } from './reducers'
import { IS_PROD } from '../../config'

const routes = [
  ...producerRoutes,
  ...locationRoutes,
  ...loginRoutes,
]

const adminRoutes = IS_PROD ? [] : routes

export {
  adminRoutes as routes,
  reducer,
}
