// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from 'common/components/avatar'
import { PRODUCER_PATH } from 'common/constants/paths'
import { ASSET_BASE } from '../../../config'
import Distance from './distance'
import Icon from '../../common/components/icon'
import styles from './card.scss'
import locationIcon from '../../common/icons/location.svg' // eslint-disable-line no-unused-vars

type Props = {
  producer: {
    location: {
      coordinates: Array<string>
    },
    categories: Array<{ _id: string, title: string }>,
    user_id: string,
    title: string,
    avatar: string,
  },
  lat: number,
  lng: number,
}

const Card = ({ producer, lat, lng }: Props) => {
  const coords = producer.location.coordinates

  const categories = producer.categories.map((category, i) => (
    <span key={category._id}>
      <span>{category.title}</span>
      {i + 1 === producer.categories.length ? null : ', '}
    </span>
  ))

  return (
    <Link className={styles.card} to={`${PRODUCER_PATH}/${producer.user_id}`}>
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
