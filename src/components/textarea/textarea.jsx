// @flow

import React from 'react'
import styles from './textarea.scss'

type Props = {
  autoComplete: String,
  id: String,
  label: String,
  name: String,
  onChange: Function,
  value: String,
}

const Textarea = ({ autoComplete, id, label, name, onChange, value }: Props) => (
  <React.Fragment>
    {label && <label htmlFor={id}>{label}</label>}
    <textarea
      className={styles.textarea}
      autoComplete={autoComplete}
      id={id}
      name={name}
      onChange={onChange}
      value={value}
    />
  </React.Fragment>
)

Textarea.defaultProps = {
  autoComplete: 'on',
  onChange: () => {},
}

export { Textarea }
