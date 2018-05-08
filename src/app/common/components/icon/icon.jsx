// @flow

import React from 'react'
import styles from './icon.scss'

type Props = {
  type: string,
  size?: string,
}

const Icon = ({ type, size }: Props) => {
  const modifier = `c-icon-${type}-${String(size)}`

  return (
    <svg className={`${styles['c-icon']} ${styles[modifier]}`}>
      <use xlinkHref={`#${type}`} />
    </svg>
  )
}

Icon.defaultProps = {
  size: '32',
}

export default Icon
