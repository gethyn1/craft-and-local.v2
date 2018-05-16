import {
  createMarker,
  getFurthestCoordinates,
  isAtProximity,
  getProducersAtSearchProximity,
  markers,
  producersReducer,
  searchProximity,
  producersAtSearchProximity,
  noMoreProducers,
} from '../reducer'

import { getDistanceBetweenPoints } from '../distances'
import { PRODUCERS_FETCH_DATA_SUCCESS } from '../action-types'

const producers = [
  { _id: '1', title: 'title 1', location: { coordinates: [1, 2] } },
  { _id: '2', title: 'title 2', location: { coordinates: [3, 4] } },
  { _id: '3', title: 'title 3', location: { coordinates: [5, 6] } },
  { _id: '4', title: 'title 4', location: { coordinates: [5, 6] } },
]

const newProducers = [{ _id: '5', title: 'title 5', location: { coordinates: [7, 8] } }]

describe('createMarker()', () => {
  it('should create a marker from a producer', () => {
    const expected = { lat: 2, lng: 1, title: 'title 1' }
    expect(createMarker(producers[0])).toEqual(expected)
  })
})

describe('getFurthestCoordinates()', () => {
  it('should get the coordinates of the last producer in the list', () => {
    expect(getFurthestCoordinates(producers)).toEqual([5, 6])
  })
})

describe('isAtProximity()', () => {
  const proximity = getDistanceBetweenPoints(1, 1, 6, 5)

  it('should return false if a producer\'s proximity from a point is not equal to the given proximity', () => {
    expect(isAtProximity(proximity, 1, 1, producers[0])).toEqual(false)
  })

  it('should return true if a producer\'s proximity from a point is equal to the given proximity', () => {
    expect(isAtProximity(proximity, 1, 1, producers[2])).toEqual(true)
  })
})

describe('getProducersAtSearchProximity()', () => {
  it('should return an array of IDs for producers whose proximity from a point is equal to the given proximity', () => {
    expect(getProducersAtSearchProximity(producers, 1, 1)).toEqual(['3', '4'])
  })
})

describe('producers > reducers', () => {
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
        { type: PRODUCERS_FETCH_DATA_SUCCESS, payload: newProducers },
      )).toEqual(expected)
    })
  })

  describe('producers', () => {
    it('should return an empty array if no action is defined', () => {
      expect(producersReducer(undefined, {})).toEqual([])
    })

    it('should append new producers to the state', () => {
      const expected = [...producers, ...newProducers]
      expect(producersReducer(
        producers,
        { type: PRODUCERS_FETCH_DATA_SUCCESS, payload: newProducers },
      )).toEqual(expected)
    })
  })

  describe('search proximity', () => {
    it('should return a default set of coordinates if no action is defined', () => {
      expect(searchProximity(undefined, {})).toEqual([0, 0])
    })

    it('should return the current state if passed an empty list of producers', () => {
      expect(searchProximity(
        [1, 2],
        { type: PRODUCERS_FETCH_DATA_SUCCESS, payload: [] },
      )).toEqual([1, 2])
    })

    it('should return the coordinates of the last producer in the list', () => {
      expect(searchProximity(
        [1, 2],
        { type: PRODUCERS_FETCH_DATA_SUCCESS, payload: producers },
      )).toEqual([5, 6])
    })
  })

  describe('producersAtSearchProximity', () => {
    it('should return an empty array if no action is defined', () => {
      expect(producersAtSearchProximity(undefined, {})).toEqual([])
    })

    it('should return the current state if passed an empty list of producers', () => {
      expect(producersAtSearchProximity(
        ['1'],
        { type: PRODUCERS_FETCH_DATA_SUCCESS, payload: [], meta: {} },
      )).toEqual(['1'])
    })

    it('should return an array of producer ids for producers at the current search proximity', () => {
      expect(producersAtSearchProximity(
        ['1'],
        {
          type: PRODUCERS_FETCH_DATA_SUCCESS,
          payload: producers,
          meta: { longitude: 1, latitude: 1 },
        },
      )).toEqual(['3', '4'])
    })
  })

  describe('noMoreProducers', () => {
    it('should return false if no action is defined', () => {
      expect(noMoreProducers(undefined, {})).toEqual(false)
    })

    it('should return true if given an empty list of producers', () => {
      expect(noMoreProducers(
        false,
        { type: PRODUCERS_FETCH_DATA_SUCCESS, payload: [] },
      )).toEqual(true)
    })
  })
})
