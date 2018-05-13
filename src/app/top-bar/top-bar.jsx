// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'common/components/container'
import styles from './top-bar.scss'

const TopBar = () => (
  <div className={styles['top-bar']}>
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.branding}>
          <Link to="/" className={styles.logo}>craft <span className={styles.logo__amp}>&amp;</span> local</Link>
        </div>
      </div>
    </Container>
  </div>
)

export default TopBar
