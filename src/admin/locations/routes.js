import {
  CREATE_LOCATION_FOR_PRODUCER_ROUTE,
  EDIT_LOCATION_ROUTE,
} from 'common/constants/paths'
import { Create } from './create'
import { Edit } from './edit'

export const routes = [
  {
    id: 'admin-edit-location',
    path: EDIT_LOCATION_ROUTE,
    name: 'Edit location',
    component: Edit,
    authenticated: true,
    isAdminRoute: true,
  },
  {
    id: 'admin-create-location',
    path: CREATE_LOCATION_FOR_PRODUCER_ROUTE,
    name: 'Create location',
    component: Create,
    authenticated: true,
    isAdminRoute: true,
  },
]
