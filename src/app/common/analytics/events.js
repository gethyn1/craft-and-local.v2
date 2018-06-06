// @flow

import ReactGA from 'react-ga'

export const shareProducerModal = (handle: string) => {
  ReactGA.event({
    category: 'Share',
    action: 'Opened modal',
    label: handle,
  })
}

export const shareProducerButton = (type: string, handle: string) => {
  ReactGA.event({
    category: 'Share',
    action: `Clicked ${type} share button`,
    label: handle,
  })
}

export const producerMetaLink = (type: string, handle: string) => ({
  category: 'Meta',
  action: `Clicked ${type} meta link`,
  label: handle,
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

export const pageNotFound = (path: string) => {
  ReactGA.event({
    category: 'Error status code',
    action: '404',
    label: path,
    nonInteraction: true,
  })
}
