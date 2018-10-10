import {
  CREATE_LOCATION_FOR_PRODUCER_ROUTE,
  EDIT_LOCATION_ROUTE,
} from 'common/constants/paths'
import { Create } from './create'
import { Edit } from './edit'

export const routes = [
  {
    path: EDIT_LOCATION_ROUTE,
    name: 'Edit location',
    component: Edit,
  },
  {
    path: CREATE_LOCATION_FOR_PRODUCER_ROUTE,
    name: 'Create location',
    component: Create,
  },
]
