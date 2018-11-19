/* eslint-disable dot-notation */
// @flow

import * as React from 'react'
import styles from './layout.scss'

type Props = {
  children: React.Node,
  direction?: ?string,
  size?: ?string,
}

type ItemProps = {
  children: React.Node,
  cols: string,
  className?: string,
}

export const Layout = ({ children, size, direction }: Props) => {
  const sizeClass = size ? `layout--${size}` : ''
  const directionClass = direction ? `layout--${direction}` : ''

  return (
    <div className={`${styles['layout']} ${styles[String(sizeClass)]} ${styles[String(directionClass)]}`}>
      {children}
    </div>
  )
}

Layout.defaultProps = {
  direction: null,
  size: null,
  className: '',
}

export const LayoutItem = ({ children, cols, className }: ItemProps) => {
  const widthClass = cols ? `u-${cols}` : ''

  return (
    <div className={`${styles['layout__item']} ${String(widthClass)} ${String(className)}`}>
      {children}
    </div>
  )
}

LayoutItem.defaultProps = {
  direction: null,
  className: '',
}
