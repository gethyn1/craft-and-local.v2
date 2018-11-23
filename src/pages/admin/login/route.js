import { LOGIN_PATH } from 'common/constants/paths'
import { container as Login } from './container'

export const route = {
  id: 'login',
  path: LOGIN_PATH,
  name: 'Login',
  component: Login,
}
