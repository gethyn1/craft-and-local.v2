// @flow

import * as React from 'react'
import styles from './list.scss'

type Props = {
  bare: boolean,
  inline: boolean,
  children: React.Node,
}

const List = ({ bare, inline, children }: Props) => (
  <ul className={`${bare ? styles.bare : ''} ${inline ? styles.inline : ''}`}>
    {children}
  </ul>
)

export default List
