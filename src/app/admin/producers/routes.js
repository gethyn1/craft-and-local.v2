import { PRODUCERS_ADMIN_ROUTE } from 'common/constants/paths'
import { container as Producers } from './container'

export const routes = [
  {
    id: 'admin-producers',
    path: PRODUCERS_ADMIN_ROUTE,
    name: 'Producers admin',
    component: Producers,
    authenticated: true,
    isAdminRoute: true,
  },
]
