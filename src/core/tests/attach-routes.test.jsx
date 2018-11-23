import React from 'react'
import { MemoryRouter, Route } from 'react-router'
import { shallow } from 'enzyme'
import { assignRoute } from '../attach-routes'
import { AuthenticatedRoute } from '../authenticated-route'
import NotFound from '../../pages/404'

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

  it('should render an authenticated route', () => {
    /* eslint-disable */
    const wrapper = shallow(
      <MemoryRouter>
        {assignRoute(false, {
          path: '/',
          name: 'MockRoute',
          component: MockComponent,
          authenticated: true,
        }, 0)}
      </MemoryRouter>
    )
    /* eslint-enable */
    const authenticatedRoute = wrapper.find(AuthenticatedRoute)
    expect(authenticatedRoute.length).toBe(1)
  })

  it('should set the adminComponent prop if defined', () => {
    /* eslint-disable */
    const wrapper = shallow(
      <MemoryRouter>
        {assignRoute(false, {
          path: '/',
          name: 'MockRoute',
          component: MockComponent,
          authenticated: true,
          isAdminRoute: true,
        }, 0)}
      </MemoryRouter>
    )
    /* eslint-enable */
    const authenticatedRoute = wrapper.find(AuthenticatedRoute)
    expect(authenticatedRoute.prop('adminComponent')).toEqual(true)
  })

  it('should not set the adminComponent prop if not defined', () => {
    /* eslint-disable */
    const wrapper = shallow(
      <MemoryRouter>
        {assignRoute(false, {
          path: '/',
          name: 'MockRoute',
          component: MockComponent,
          authenticated: true,
        }, 0)}
      </MemoryRouter>
    )
    /* eslint-enable */
    const authenticatedRoute = wrapper.find(AuthenticatedRoute)
    expect(authenticatedRoute.prop('adminComponent')).toEqual(undefined)
  })
})
