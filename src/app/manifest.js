import { route as producersRoute } from './producers'
import { route as producerRoute } from './producer'
import { route as contactRoute } from './contact'
import { routes as adminRoutes } from './admin'

const routes = [
  producersRoute,
  producerRoute,
  contactRoute,
  ...adminRoutes,
]

export default routes
