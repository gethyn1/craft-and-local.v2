// @flow

import * as React from 'react'
import styles from './list.scss'

type Props = {
  className: ?string,
  bare: boolean,
  inline: boolean,
  children: React.Node,
}

const List = ({ className, bare, inline, children }: Props) => (
  <ul className={`${bare ? styles.bare : ''} ${inline ? styles.inline : ''} ${String(className)}`}>
    {children}
  </ul>
)

export default List
