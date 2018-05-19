import React from 'react'
import { shallow } from 'enzyme'
import Producers from '../Producers'

const getProducers = jest.fn()
const resetProducers = jest.fn()
const loadMoreProducers = jest.fn()

const defaultProps = {
  getProducers,
  producers: [],
  markers: [],
  searchProximity: [],
  producersAtSearchProximity: [],
  isFetching: false,
  hasErrored: false,
  loadMoreProducers,
  noMoreProducers: false,
  categories: [],
  latitude: 1,
  longitude: 1,
  userLocationHasLoaded: false,
  category: null,
  categoriesHaveLoaded: false,
  resetProducers,
}

const shallowProducers = (props = defaultProps) =>
  shallow(<Producers {...props} />)

describe('<Producers />', () => {
  beforeEach(() => {
    getProducers.mockReset()
    resetProducers.mockReset()
    loadMoreProducers.mockReset()
  })

  describe('behaviour', () => {
    it('should get producers if user latLng and categories are defined in the app', () => {
      const wrapper = shallowProducers()

      wrapper.setProps({
        userLocationHasLoaded: true,
        categoriesHaveLoaded: true,
      })

      expect(getProducers.mock.calls.length).toBe(1)
    })

    it('should get producers if category changes', () => {
      const wrapper = shallowProducers({
        ...defaultProps,
        category: '1',
        userLocationHasLoaded: true,
        categoriesHaveLoaded: true,
      })

      wrapper.setProps({ category: '2' })

      expect(getProducers.mock.calls.length).toBe(1)
    })

    it('should reset producers if category changes', () => {
      const wrapper = shallowProducers({
        ...defaultProps,
        category: '1',
        userLocationHasLoaded: true,
        categoriesHaveLoaded: true,
      })

      wrapper.setProps({ category: '2' })

      expect(resetProducers.mock.calls.length).toBe(1)
    })

    it('should load more producers when user clicks load more button', () => {
      const wrapper = shallowProducers()
      const button = wrapper.find('[data-test-id="producers/load-more"]')

      button.simulate('click')
      expect(loadMoreProducers.mock.calls.length).toBe(1)
    })

    it('should call load more producers with the correct parameters', () => {
      const wrapper = shallowProducers({ ...defaultProps, category: { _id: '3' } })
      const button = wrapper.find('[data-test-id="producers/load-more"]')

      button.simulate('click')
      expect(loadMoreProducers.mock.calls[0][0]).toEqual({
        latitude: defaultProps.latitude,
        longitude: defaultProps.longitude,
        searchProximity: defaultProps.searchProximity,
        exclude: defaultProps.producersAtSearchProximity,
        categories: '3',
      })
    })
  })
})