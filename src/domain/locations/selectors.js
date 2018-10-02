// @flow

import { path } from 'ramda'

export const data = (state: Object) => path(['domain', 'locations', 'data'], state)
export const locations = (state: Object) => path(['locations'], data(state))
export const markers = (state: Object) => path(['markers'], data(state))
