// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import Filter from './filter'
import styles from './filters.scss'

type Props = {
  categories: Array<Object>,
  active: ?string,
}

const Filters = ({ categories, active }: Props) => (
  <div className={styles.wrapper}>
    <ul className={styles['filter-list']}>
      <li className={styles['filter-item']}>
        <Link
          to="/producers"
          className={`${styles.filter} ${!active ? styles.active : ''}`}
        >
          All
        </Link>
      </li>
      {categories.map(category =>
        <Filter key={category._id} category={category} active={active === category._id} />)}
    </ul>
  </div>
)

export default Filters
