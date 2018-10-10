import { locationsWithAssociatedProducer } from '../adapters'

const locations = [
  { producer: true },
  { producer: true },
  { producer: true },
]

const locationWithNoProducer = { noProducer: true }

describe('locations > adapters', () => {
  it('should pass through all locations with an associated producer', () => {
    const expected = 3
    const result = locationsWithAssociatedProducer(locations).length
    expect(result).toBe(expected)
  })

  it('should not pass through locations with no associated producer', () => {
    const expected = 3
    const result = locationsWithAssociatedProducer([
      ...locationsWithAssociatedProducer(locations),
      locationWithNoProducer,
    ]).length
    expect(result).toBe(expected)
  })
})
