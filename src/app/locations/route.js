import Container from './container'

export const route = {
  exact: true,
  path: '/producers/:category?',
  name: 'Producers',
  component: Container,
}
