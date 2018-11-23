import { route as locationsRoute } from '../pages/locations'
import { route as producerRoute } from '../pages/producer'
import { route as contactRoute } from '../pages/contact'
import { route as loginRoute } from '../pages/admin/login'
import { routes as adminRoutes } from '../admin'

const routes = [
  locationsRoute,
  producerRoute,
  contactRoute,
  loginRoute,
  ...adminRoutes,
]

export default routes
