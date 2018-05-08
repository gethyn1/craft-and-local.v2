// @flow

import React from 'react'
import styles from './container.scss'

type Props = {
  children: React.Element<*>,
}

const Container = ({ children }: Props) => (
  <div className={styles.container}>
    {children}
  </div>
)

export default Container
