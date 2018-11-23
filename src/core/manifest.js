import { route as locationsRoute } from '../pages/locations'
import { route as producerRoute } from '../pages/producer'
import { route as contactRoute } from '../pages/contact'
import { routes as adminRoutes } from '../pages/admin'

const routes = [
  locationsRoute,
  producerRoute,
  contactRoute,
  ...adminRoutes,
]

export default routes
