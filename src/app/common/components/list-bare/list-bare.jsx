// @flow

import * as React from 'react'
import styles from './list-bare.scss'

type Props = {
  children: React.Node,
}

const ListBare = ({ children }: Props) => (
  <ul className={styles['list-bare']}>
    {children}
  </ul>
)

export default ListBare
