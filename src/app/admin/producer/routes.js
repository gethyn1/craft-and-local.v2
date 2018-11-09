import {
  CREATE_PRODUCERS_PATH,
  EDIT_PRODUCERS_ROUTE,
} from 'common/constants/paths'
import { Create } from './create'
import { Edit } from './edit'

export const routes = [
  {
    id: 'admin-create-producer',
    path: CREATE_PRODUCERS_PATH,
    name: 'Create producer',
    component: Create,
    authenticated: true,
    isAdminRoute: true,
  },
  {
    id: 'admin-edit-producer',
    path: EDIT_PRODUCERS_ROUTE,
    name: 'Edit producer',
    component: Edit,
    authenticated: true,
    isAdminRoute: true,
  },
]
