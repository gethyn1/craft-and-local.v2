import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'

jest.doMock('react-router-dom', () => ({
  Redirect: () => <div />,
  Route: () => <div />,
  Link: () => <div />,
}))

const App = require('../app').default

const getUserLocation = jest.fn()
const getCategories = jest.fn()

describe('<App />', () => {
  beforeEach(() => {
    getUserLocation.mockReset()
    getCategories.mockReset()
  })

  it('should get user location when the app mounts', () => {
    /* eslint-disable */
    const wrapper = mount(
      <MemoryRouter>
        <App getUserLocation={getUserLocation} getCategories={getCategories} />
      </MemoryRouter>
    )
    /* eslint-enable */

    expect(getUserLocation.mock.calls.length).toBe(1)
  })

  it('should get categories from API when the app mounts', () => {
    /* eslint-disable */
    const wrapper = mount(
      <MemoryRouter>
        <App getUserLocation={getUserLocation} getCategories={getCategories} />
      </MemoryRouter>
    )
    /* eslint-enable */

    expect(getCategories.mock.calls.length).toBe(1)
  })
})
