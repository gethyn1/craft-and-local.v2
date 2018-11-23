// @flow

import { path } from 'ramda'
import { TOGGLE_MODAL, PAGE_NOT_FOUND, RESET_PAGE_ERRORS } from './action-types'

type ModalProps = {
  isVisible: boolean,
  modal: string,
}

export const toggleModal = (payload: ModalProps) => ({
  type: TOGGLE_MODAL,
  payload,
})

export const pageNotFound = () => ({
  type: PAGE_NOT_FOUND,
})

export const resetPageErrors = () => ({
  type: RESET_PAGE_ERRORS,
})

export const handlePageError = (err: string, defaultAction: { type: string, payload?: any }) =>
  (dispatch: Function) => {
    switch (path(['message'], err)) {
      case '404':
        return dispatch(pageNotFound())
      default:
        return dispatch(defaultAction)
    }
  }
