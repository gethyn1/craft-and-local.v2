// @flow

import * as React from 'react'
import Icon from 'components/icon'
import closeIcon from 'common/icons/close.svg' // eslint-disable-line no-unused-vars
import styles from './notification.scss'

type Status = 'success' | 'task' | 'error'

type Props = {
  message: string,
  status: Status,
  onDismiss: ?Function,
}

export const Notification = ({ message, status, onDismiss }: Props) => (
  <div className={`${styles.notification} ${styles[status]}`}>
    <p className={styles.message}>{message}</p>
    {onDismiss && <button className={styles.close} onClick={onDismiss}><Icon type="close" size="12" /></button>}
  </div>
)
