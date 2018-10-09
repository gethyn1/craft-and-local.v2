// @flow

import React from 'react'
import styles from './input.scss'

type Props = {
  autoComplete: String,
  id: String,
  label: String,
  name: String,
  onChange: Function,
  type: String,
  value: String,
}

const Input = ({ autoComplete, id, label, name, onChange, type, value }: Props) => (
  <React.Fragment>
    {label && <label htmlFor={id}>{label}</label>}
    <input
      className={styles.input}
      autoComplete={autoComplete}
      id={id}
      type={type}
      name={name}
      onChange={onChange}
      value={value}
    />
  </React.Fragment>
)

Input.defaultProps = {
  autoComplete: 'on',
  type: 'text',
  onChange: () => {},
}

export { Input }
