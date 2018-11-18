import ProducerContainer from './container'

export const route = {
  id: 'producer',
  path: '/producer/:userId/:id',
  name: 'Producer',
  component: ProducerContainer,
}
