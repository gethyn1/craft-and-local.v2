// @flow

export const CONTACT_PATH = '/contact'
export const PRODUCER_PATH = '/producer'
export const PRODUCERS_PATH = '/producers'
export const CREATE_PRODUCERS_PATH = '/admin/producers/create'
export const EDIT_PRODUCERS_ROUTE = '/admin/producers/edit/:userId'
export const EDIT_PRODUCERS_PATH = '/admin/producers/edit'
export const CREATE_LOCATION_PATH = (producerId: String) => `/admin/${producerId ? `${String(producerId)}/` : ''}locations/create`
export const CREATE_LOCATION_FOR_PRODUCER_ROUTE = '/admin/:producerId/locations/create'
export const EDIT_LOCATION_ROUTE = '/admin/locations/edit/:id'
export const EDIT_LOCATION_PATH = '/admin/locations/edit'
