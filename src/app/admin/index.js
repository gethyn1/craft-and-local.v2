import { routes as producerRoutes } from './producers'
import { routes as locationRoutes } from './locations'
import { reducer } from './reducers'
import { IS_PROD } from '../../config'

const routes = [
  ...producerRoutes,
  ...locationRoutes,
]

const adminRoutes = IS_PROD ? [] : routes

export {
  adminRoutes as routes,
  reducer,
}
