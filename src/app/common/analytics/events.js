// @flow

export const shareProducerModal = (userId: string) => ({
  category: 'Share',
  action: 'Opened modal',
  label: userId,
})

export const shareProducerButton = (type: string, userId: string) => ({
  category: 'Share',
  action: `Clicked ${type} share button`,
  label: userId,
})

export const producerMetaLink = (type: string, userId: string) => ({
  category: 'Meta',
  action: `Clicked ${type} meta link`,
  label: userId,
})

export const loadMoreProducers = (category: ?string, count: ?number) => ({
  category: 'User requested content',
  action: 'Load more producers',
  label: category || 'all',
  value: count === null ? 0 : count,
})

export const producerRenderedInResults = (userId: string) => ({
  category: 'Producer statistics',
  action: 'Producer rendered in results',
  label: userId,
})

export const pageNotFound = (path: string) => ({
  category: 'Error status code',
  action: '404',
  label: path,
  nonInteraction: true,
})
