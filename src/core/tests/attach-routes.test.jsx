import React from 'react'
import { MemoryRouter, Route } from 'react-router'
import { shallow } from 'enzyme'
import { assignRoute } from '../attach-routes'
import NotFound from '../../app/404'

const MockComponent = () => <div />

describe('attach routes', () => {
  it('should render the correct component', () => {
    /* eslint-disable */
    const wrapper = shallow(
      <MemoryRouter>
        {assignRoute(false, {
          exact: true,
          path: '/',
          name: 'MockRoute',
          component: MockComponent,
        }, 0)}
      </MemoryRouter>
    )
    /* eslint-enable */
    const route = wrapper.find(Route)
    expect(route.prop('component')).toEqual(MockComponent)
  })

  it('should render 404 if page not found', () => {
    /* eslint-disable */
    const wrapper = shallow(
      <MemoryRouter>
        {assignRoute(true, {}, 0)}
      </MemoryRouter>
    )
    /* eslint-enable */
    const route = wrapper.find(Route)
    expect(route.prop('component')).toEqual(NotFound)
  })
})
