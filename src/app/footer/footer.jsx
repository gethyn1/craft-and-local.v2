import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'common/components/container'
import { PRODUCERS_PATH, CONTACT_PATH } from 'common/constants/paths'
import List from 'common/components/list'
import { APP_NAME } from '../../config'
import styles from './footer.scss'

const DATE = new Date()
const YEAR = DATE.getFullYear()

const Footer = () => (
  <footer className={styles.footer}>
    <Container>
      <List inline bare className={styles.nav}>
        <li className={styles.nav__item}>
          <Link className={styles.nav__link} to={PRODUCERS_PATH}>Producers</Link>
        </li>
        <li className={styles.nav__item}>
          <Link className={styles.nav__link} to={CONTACT_PATH}>Contact</Link>
        </li>
      </List>
      <p className={styles.copyright}>&copy; {YEAR} {APP_NAME}</p>
    </Container>
  </footer>
)

export default Footer
