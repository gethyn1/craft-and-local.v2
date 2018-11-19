// @flow

import * as React from 'react'
import closeIcon from 'common/icons/close.svg' // eslint-disable-line no-unused-vars
import Icon from 'components/icon'
import styles from './modal.scss'

type Props = {
  children: React.Element<*>,
  className?: string,
  isVisible: boolean,
  toggleVisibility: Function,
}

const onOverlayClick = (
  event: & { target: HTMLElement, currentTarget: HTMLElement },
  fn: Function,
) => {
  if (event.target === event.currentTarget) {
    fn()
  }

  return null
}

/* eslint-disable jsx-a11y/click-events-have-key-events */
const Modal = ({ children, className, isVisible, toggleVisibility }: Props) => {
  if (isVisible) {
    return (
      <div
        role="button"
        tabIndex={0}
        className={`${styles.overlay} ${className ? String(className) : ''}`}
        onClick={(e) => { onOverlayClick(e, toggleVisibility) }}
      >
        <div className={styles.wrapper}>
          <button className={styles.close} onClick={toggleVisibility}><Icon type="close" size="20" /></button>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    )
  }

  return null
}

Modal.defaultProps = {
  className: null,
}

export default Modal
