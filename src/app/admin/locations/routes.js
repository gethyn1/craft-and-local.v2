import {
  EDIT_LOCATION_ROUTE_PATH,
} from 'common/constants/paths'
import { Edit } from './edit'

export const routes = [
  {
    path: EDIT_LOCATION_ROUTE_PATH,
    name: 'Edit producer',
    component: Edit,
  },
]
