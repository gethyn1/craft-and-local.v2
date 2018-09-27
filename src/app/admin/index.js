import { routes } from './producers'
import { reducer } from './reducers'
import { IS_PROD } from '../../config'

const adminRoutes = IS_PROD ? [] : routes

export {
  adminRoutes as routes,
  reducer,
}
