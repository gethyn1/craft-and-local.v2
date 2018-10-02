import {
  createMarker,
  getFurthestCoordinates,
  isAtProximity,
  getLocationsAtSearchProximity,
  markers,
  locationsReducer,
  searchProximity,
  locationsAtSearchProximity,
  noMoreLocations,
} from '../reducer'

import { getDistanceBetweenPoints } from '../distances'
import { LOCATIONS_FETCH_DATA_SUCCESS, LOCATIONS_RESET_DATA } from '../action-types'

const locations = [
  { _id: '1', title: 'title 1', location: { coordinates: [1, 2] } },
  { _id: '2', title: 'title 2', location: { coordinates: [3, 4] } },
  { _id: '3', title: 'title 3', location: { coordinates: [5, 6] } },
  { _id: '4', title: 'title 4', location: { coordinates: [5, 6] } },
]

const newLocations = [{ _id: '5', title: 'title 5', location: { coordinates: [7, 8] } }]

describe('createMarker()', () => {
  it('should create a marker from a location', () => {
    const expected = { lat: 2, lng: 1, title: 'title 1' }
    expect(createMarker(locations[0])).toEqual(expected)
  })
})

describe('getFurthestCoordinates()', () => {
  it('should get the coordinates of the last location in the list', () => {
    expect(getFurthestCoordinates(locations)).toEqual([5, 6])
  })
})

describe('isAtProximity()', () => {
  const proximity = getDistanceBetweenPoints(1, 1, 6, 5)

  it('should return false if a location\'s proximity from a point is not equal to the given proximity', () => {
    expect(isAtProximity(proximity, 1, 1, locations[0])).toEqual(false)
  })

  it('should return true if a location\'s proximity from a point is equal to the given proximity', () => {
    expect(isAtProximity(proximity, 1, 1, locations[2])).toEqual(true)
  })
})

describe('getLocationsAtSearchProximity()', () => {
  it('should return an array of IDs for locations whose proximity from a point is equal to the given proximity', () => {
    expect(getLocationsAtSearchProximity(locations, 1, 1)).toEqual(['3', '4'])
  })
})

describe('locations > reducers', () => {
  describe('markers', () => {
    it('should return an empty array if no action is defined', () => {
      expect(markers(undefined, {})).toEqual([])
    })

    it('should append new markers to the state', () => {
      const currentMarkers = [{ lat: 2, lng: 1, title: 'title 1' }]
      const newMarkers = [{ lat: 8, lng: 7, title: 'title 5' }]
      const expected = [...currentMarkers, ...newMarkers]

      expect(markers(
        currentMarkers,
        { type: LOCATIONS_FETCH_DATA_SUCCESS, payload: newLocations },
      )).toEqual(expected)
    })

    it('should reset the state', () => {
      const currentMarkers = [{ lat: 2, lng: 1, title: 'title 1' }]
      const expected = []
      expect(markers(
        currentMarkers,
        { type: LOCATIONS_RESET_DATA },
      )).toEqual(expected)
    })
  })

  describe('locations', () => {
    it('should return an empty array if no action is defined', () => {
      expect(locationsReducer(undefined, {})).toEqual([])
    })

    it('should append new locations to the state', () => {
      const expected = [...locations, ...newLocations]
      expect(locationsReducer(
        locations,
        { type: LOCATIONS_FETCH_DATA_SUCCESS, payload: newLocations },
      )).toEqual(expected)
    })

    it('should reset the state', () => {
      const expected = []
      expect(locationsReducer(
        locations,
        { type: LOCATIONS_RESET_DATA },
      )).toEqual(expected)
    })
  })

  describe('search proximity', () => {
    it('should return a default set of coordinates if no action is defined', () => {
      expect(searchProximity(undefined, {})).toEqual([0, 0])
    })

    it('should return the current state if passed an empty list of locations', () => {
      expect(searchProximity(
        [1, 2],
        { type: LOCATIONS_FETCH_DATA_SUCCESS, payload: [] },
      )).toEqual([1, 2])
    })

    it('should return the coordinates of the last location in the list', () => {
      expect(searchProximity(
        [1, 2],
        { type: LOCATIONS_FETCH_DATA_SUCCESS, payload: locations },
      )).toEqual([5, 6])
    })
  })

  describe('locationsAtSearchProximity', () => {
    it('should return an empty array if no action is defined', () => {
      expect(locationsAtSearchProximity(undefined, {})).toEqual([])
    })

    it('should return the current state if passed an empty list of locations', () => {
      expect(locationsAtSearchProximity(
        ['1'],
        { type: LOCATIONS_FETCH_DATA_SUCCESS, payload: [], meta: {} },
      )).toEqual(['1'])
    })

    it('should return an array of location ids for locations at the current search proximity', () => {
      expect(locationsAtSearchProximity(
        ['1'],
        {
          type: LOCATIONS_FETCH_DATA_SUCCESS,
          payload: locations,
          meta: { longitude: 1, latitude: 1 },
        },
      )).toEqual(['3', '4'])
    })
  })

  describe('noMoreLocations', () => {
    it('should return false if no action is defined', () => {
      expect(noMoreLocations(undefined, {})).toEqual(false)
    })

    it('should return true if given an empty list of locations', () => {
      expect(noMoreLocations(
        false,
        { type: LOCATIONS_FETCH_DATA_SUCCESS, payload: [] },
      )).toEqual(true)
    })
  })
})
