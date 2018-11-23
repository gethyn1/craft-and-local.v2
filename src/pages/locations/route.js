import Container from './container'

export const route = {
  id: 'locations',
  exact: true,
  path: '/producers/:category?',
  name: 'Producers',
  component: Container,
}
