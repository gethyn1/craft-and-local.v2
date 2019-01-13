import {
  EDIT_CATEGORIES_ROUTE,
} from 'common/constants/paths'
import { container as Categories } from './container'

export const routes = [
  {
    id: 'admin-categories',
    path: EDIT_CATEGORIES_ROUTE,
    name: 'Edit categories',
    component: Categories,
    authenticated: true,
    isAdminRoute: true,
  },
]
