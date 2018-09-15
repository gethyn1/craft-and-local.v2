import {
  CREATE_PRODUCERS_PATH,
  EDIT_PRODUCERS_ROUTE_PATH,
} from 'common/constants/paths'
import { Create } from './create'
import { Edit } from './edit'

export const routes = [
  {
    path: CREATE_PRODUCERS_PATH,
    name: 'Create producer',
    component: Create,
  },
  {
    path: EDIT_PRODUCERS_ROUTE_PATH,
    name: 'Edit producer',
    component: Edit,
  },
]
