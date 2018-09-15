import { CREATE_PRODUCERS_PATH } from 'common/constants/paths'
import { container } from './container'

export const route = {
  path: CREATE_PRODUCERS_PATH,
  name: 'Create producer',
  component: container,
}
