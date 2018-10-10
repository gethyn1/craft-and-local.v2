// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import styles from './filters.scss'

type Props = {
  category: {
    _id: string,
    slug: string,
    title: string,
  },
  active: boolean,
}

const Filter = ({ category, active }: Props) => (
  <li className={styles['filter-item']}>
    <Link
      to={`/producers/${category.slug}`}
      className={`${styles.filter} ${active ? styles.active : ''}`}
    >
      {category.title}
    </Link>
  </li>
)

export default Filter
