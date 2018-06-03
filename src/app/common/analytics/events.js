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

export const producerMetaLink = (type: string, handle: string) => {
  ReactGA.event({
    category: 'Meta',
    action: `Clicked ${type} meta link`,
    label: handle,
  })
}

export const loadMoreProducers = (category: ?string, count: ?number) => {
  ReactGA.event({
    category: 'User requested content',
    action: 'Load more producers',
    label: category,
    value: count === null ? 0 : count,
  })
}

export const pageNotFound = (type: string, path: string) => {
  ReactGA.event({
    category: '404',
    action: `${type} not found`,
    label: path,
    nonInteraction: true,
  })
}
