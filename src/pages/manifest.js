import { route as locationsRoute } from './locations'
import { route as producerRoute } from './producer'
import { route as contactRoute } from './contact'
import { routes as adminRoutes } from '../admin'

const routes = [
  locationsRoute,
  producerRoute,
  contactRoute,
  ...adminRoutes,
]

export default routes
