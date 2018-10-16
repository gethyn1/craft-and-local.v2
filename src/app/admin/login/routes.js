import { LOGIN_PATH } from 'common/constants/paths'
import { container as Login } from './container'

export const routes = [
  {
    path: LOGIN_PATH,
    name: 'Login',
    component: Login,
  },
]
