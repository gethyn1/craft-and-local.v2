import { route as locationsRoute } from '../pages/locations'
import { route as producerRoute } from '../pages/producer'
import { route as contactRoute } from '../pages/contact'
import { routes as adminRoutes } from '../admin'
import { routes as pageAdminRoutes } from '../pages/admin'

const routes = [
  locationsRoute,
  producerRoute,
  contactRoute,
  ...pageAdminRoutes,
  ...adminRoutes,
]

export default routes
