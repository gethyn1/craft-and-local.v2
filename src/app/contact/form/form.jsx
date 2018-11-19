// @flow

import React from 'react'
import { Button } from 'components/button'
import styles from './form.scss'

const Form = () => (
  <form name="contact" method="post">
    <input type="hidden" name="form-name" value="contact" />
    <div className={styles.row}>
      <label htmlFor="contact-name">
        <span className={styles.label}>Name</span>
        <input required className={styles.input} type="text" name="contact-name" id="name" />
      </label>
    </div>
    <div className={styles.row}>
      <label htmlFor="contact-email">
        <span className={styles.label}>Email address</span>
        <input required className={styles.input} type="email" name="email" id="contact-email" />
      </label>
    </div>
    <div className={styles.row}>
      <label htmlFor="contact-message">
        <span className={styles.label}>Message</span>
        <textarea required className={`${styles.input} ${styles.textarea}`} name="contact-message" />
      </label>
    </div>
    <div className={styles.row}>
      <Button type="submit">Send</Button>
    </div>
  </form>
)

export default Form
