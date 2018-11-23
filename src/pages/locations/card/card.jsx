// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'components/avatar'
import Icon from 'components/icon'
import { PRODUCER_PATH } from 'common/constants/paths'
import locationIcon from 'common/icons/location.svg' // eslint-disable-line no-unused-vars
import { ASSET_BASE } from '../../../config'
import Distance from './distance'
import styles from './card.scss'

type Props = {
  location: {
    _id: string,
    location: {
      coordinates: Array<string>
    },
    categories: Array<{ _id: string, title: string }>,
    producer: {
      userId: string,
      title: string,
      avatar: string,
    },
  },
  lat: number,
  lng: number,
}

const Card = ({ location, lat, lng }: Props) => {
  const { producer } = location
  const coords = location.location.coordinates

  const categories = location.categories.map((category, i) => (
    <span key={category._id}>
      <span>{category.title}</span>
      {i + 1 === location.categories.length ? null : ', '}
    </span>
  ))

  return (
    <Link className={styles.card} to={`${PRODUCER_PATH}/${producer.userId}/${location._id}`}>
      <Avatar size="small" className="u-margin-bottom" alt={producer.title} src={`${ASSET_BASE}/${producer.avatar}`} />
      <h2 className={styles.title}>{producer.title}</h2>
      <p className={styles.categories}>{categories}</p>
      <div className={styles.distance}>
        <Icon type="location" size="12" />
        <Distance
          from={{ lat, lng }}
          to={{ lat: coords[1], lng: coords[0] }}
        />
      </div>
    </Link>
  )
}

export default Card
