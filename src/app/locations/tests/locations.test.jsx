import React from 'react'
import { shallow } from 'enzyme'
import { Locations } from '../locations'
import { LOAD_MORE_LOCATIONS_TEST_ID } from '../constants'

const getLocations = jest.fn()
const resetLocations = jest.fn()
const loadMoreLocations = jest.fn()
const trackLoadMoreLocations = jest.fn()

const defaultProps = {
  getLocations,
  locations: [],
  markers: [],
  searchProximity: [],
  locationsAtSearchProximity: [],
  isFetching: false,
  hasErrored: false,
  loadMoreLocations,
  noMoreLocations: false,
  categories: [],
  latitude: 1,
  longitude: 1,
  userLocationHasLoaded: false,
  category: null,
  categoriesHaveLoaded: false,
  resetLocations,
  trackLoadMoreLocations,
}

const shallowLocations = (props = defaultProps) =>
  shallow(<Locations {...props} />)

describe('<Locations />', () => {
  beforeEach(() => {
    getLocations.mockReset()
    resetLocations.mockReset()
    loadMoreLocations.mockReset()
    trackLoadMoreLocations.mockReset()
  })

  describe('behaviour', () => {
    it('should get locations if user latLng and categories are defined in the app', () => {
      const wrapper = shallowLocations()

      wrapper.setProps({
        userLocationHasLoaded: true,
        categoriesHaveLoaded: true,
      })

      expect(getLocations.mock.calls.length).toBe(1)
    })

    it('should get locations if category changes', () => {
      const wrapper = shallowLocations({
        ...defaultProps,
        category: '1',
        userLocationHasLoaded: true,
        categoriesHaveLoaded: true,
      })

      wrapper.setProps({ category: '2' })

      expect(getLocations.mock.calls.length).toBe(1)
    })

    it('should reset locations if category changes', () => {
      const wrapper = shallowLocations({
        ...defaultProps,
        category: '1',
        userLocationHasLoaded: true,
        categoriesHaveLoaded: true,
      })

      wrapper.setProps({ category: '2' })

      expect(resetLocations.mock.calls.length).toBe(1)
    })

    it('should load more locations when user clicks load more button', () => {
      const wrapper = shallowLocations()
      wrapper.setState({ hasFetched: true })
      const button = wrapper.find(`[data-test-id="${LOAD_MORE_LOCATIONS_TEST_ID}"]`)

      button.simulate('click')
      expect(loadMoreLocations.mock.calls.length).toBe(1)
    })

    it('should call load more locations with the correct parameters', () => {
      const wrapper = shallowLocations({ ...defaultProps, category: { _id: '3', title: 'category title' } })
      wrapper.setState({ hasFetched: true })
      const button = wrapper.find(`[data-test-id="${LOAD_MORE_LOCATIONS_TEST_ID}"]`)

      button.simulate('click')
      expect(loadMoreLocations.mock.calls[0][0]).toEqual({
        latitude: defaultProps.latitude,
        longitude: defaultProps.longitude,
        searchProximity: defaultProps.searchProximity,
        exclude: defaultProps.locationsAtSearchProximity,
        categories: '3',
        categorySlug: 'category title',
        count: 0,
      })
    })

    it('should not render load more button if locations have not been loaded', () => {
      const wrapper = shallowLocations()
      wrapper.setState({ hasFetched: false })
      const loadMoreButton = wrapper.find(`[data-test-id="${LOAD_MORE_LOCATIONS_TEST_ID}"]`)
      expect(loadMoreButton.length).toBe(0)
    })
  })
})
