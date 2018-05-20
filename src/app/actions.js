// @flow
/* eslint-disable import/prefer-default-export */
import { TOGGLE_MODAL } from './action-types'

type ModalProps = {
  isVisible: boolean,
  modal: string,
}

export const toggleModal = (payload: ModalProps) => ({
  type: TOGGLE_MODAL,
  payload,
})
