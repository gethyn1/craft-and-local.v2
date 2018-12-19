// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'components/container'
import List from 'components/list'
import styles from './top-bar.scss'

type Props = {
  navigationItems: Array<Object>,
}

const TopBar = ({ navigationItems }: Props) => (
  <div className={styles['top-bar']}>
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.branding}>
          <Link to="/" className={styles.logo}>craft <span className={styles.logo__amp}>&amp;</span> local</Link>
        </div>
        <List className={styles.nav} inline bare>
          {navigationItems.map(item => (
            <li key={item.key}>
              <Link className={styles['nav-link']} to={item.path}>{item.title}</Link>
            </li>
          ))}
        </List>
      </div>
    </Container>
  </div>
)

export default TopBar
