// @flow

const ADMIN_PREFIX = '/admin'

export const CONTACT_PATH = '/contact'
export const PRODUCER_PATH = '/producer'
export const PRODUCERS_PATH = '/producers'
export const PRODUCERS_ADMIN_ROUTE = `${ADMIN_PREFIX}/producers`
export const CREATE_PRODUCERS_PATH = `${ADMIN_PREFIX}/producers/create`
export const EDIT_PRODUCERS_ROUTE = `${ADMIN_PREFIX}/producers/edit/:userId`
export const EDIT_PRODUCERS_PATH = `${ADMIN_PREFIX}/producers/edit`
export const CREATE_LOCATION_PATH = (producerId: String) => `${ADMIN_PREFIX}/${producerId ? `${String(producerId)}/` : ''}locations/create`
export const CREATE_LOCATION_FOR_PRODUCER_ROUTE = `${ADMIN_PREFIX}/:producerId/locations/create`
export const EDIT_LOCATION_ROUTE = `${ADMIN_PREFIX}/locations/edit/:id`
export const EDIT_LOCATION_PATH = `${ADMIN_PREFIX}/locations/edit`
export const LOGIN_PATH = `${ADMIN_PREFIX}/login`
