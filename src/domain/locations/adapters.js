import { filter, path, isNil } from 'ramda'

export const locationsWithAssociatedProducer = filter(location => !isNil(path(['producer'], location)))
