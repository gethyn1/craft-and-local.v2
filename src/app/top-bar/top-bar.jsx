// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'components/container'
import List from 'components/list'
import { CONTACT_PATH, PRODUCERS_PATH } from 'common/constants/paths'
import styles from './top-bar.scss'

const TopBar = () => (
  <div className={styles['top-bar']}>
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.branding}>
          <Link to="/" className={styles.logo}>craft <span className={styles.logo__amp}>&amp;</span> local</Link>
        </div>
        <List className={styles.nav} inline bare>
          <li><Link className={styles['nav-link']} to={PRODUCERS_PATH}>Producers</Link></li>
          <li><Link className={styles['nav-link']} to={CONTACT_PATH}>Contact</Link></li>
        </List>
      </div>
    </Container>
  </div>
)

export default TopBar
