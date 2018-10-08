import {
  CREATE_LOCATION_ROUTE_PATH,
  EDIT_LOCATION_ROUTE_PATH,
} from 'common/constants/paths'
import { Create } from './create'
import { Edit } from './edit'

export const routes = [
  {
    path: EDIT_LOCATION_ROUTE_PATH,
    name: 'Edit location',
    component: Edit,
  },
  {
    path: CREATE_LOCATION_ROUTE_PATH,
    name: 'Create location',
    component: Create,
  },
]
