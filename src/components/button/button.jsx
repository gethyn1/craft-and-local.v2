// @flow

/**
 *
 * <Button>{children}</Button>
 *
 * A common button, if you pass it a prop "href" it will render an <a> tag
 * otherwise it will render a button with an onClick method.
 */

import * as React from 'react'
import styles from './button.scss'

type Props = {
  block?: Boolean,
  children: React.Element<*>,
  className?: string,
  href?: string,
  level?: string,
  onClick?: Function,
  target?: string,
  type?: string,
  disabled?: boolean,
}

/**
 * Return a space separated string from an array.
 */

const generateClassList = (classes: Array<*>) =>
  classes
    .filter(className => className)
    .join(' ')


/**
 * Button react component.
 */

const Button = ({ block, children, className, href, level, onClick, target, type, disabled }: Props) => {
  // Create the class list for the Button
  const classList = generateClassList([
    styles.button,
    styles[level],
    className,
    block ? styles.block : false,
  ])

  // Render an <a> tag if href prop is defined
  if (href) {
    return (
      <a href={href} target={target} onClick={onClick} className={classList} disabled={disabled}>
        {children}
      </a>
    )
  }

  // Render a <button> tag if no href prop is defined
  return (
    <button type={type} onClick={onClick} className={classList} disabled={disabled}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  block: false,
  className: null,
  href: null,
  level: null,
  onClick: null,
  target: null,
  type: null,
  disabled: false,
}

export { generateClassList, Button }
