// @flow

import React from 'react'
import { Helmet } from 'react-helmet'
import Avatar from 'common/components/avatar'
import Container from 'common/components/container'
import GoogleMap from 'common/components/google-map'
import Icon from 'common/components/icon'
import List from 'common/components/list'
/* eslint-disable no-unused-vars */
import twitterIcon from 'common/icons/twitter.svg'
import instagramIcon from 'common/icons/instagram.svg'
import linkIcon from 'common/icons/link.svg'
import locationIcon from 'common/icons/location.svg'
/* eslint-enable no-unused-vars */
import { ASSET_BASE, APP_NAME, TWITTER_HANDLE } from '../../config'
import Categories from './categories'
import ShareProfile from './share-profile'
import { removeUrlPrefix } from './remove-url-prefix'
import styles from './producer.scss'

type Props = {
  producer: ?Object,
  isFetching: boolean,
  hasErrored: boolean,
  isSharing: boolean,
  shareProfile: Function,
  getProducer: Function,
  userId: string,
  trackProducerMetaLink: Function,
}

class Producer extends React.Component<Props> {
  componentDidMount() {
    this.props.getProducer(this.props.userId)
  }

  render() {
    const { hasErrored, isFetching, producer, isSharing, shareProfile, trackProducerMetaLink } = this.props

    if (hasErrored) {
      return <p>There was an error loading producer</p>
    }

    if (!producer || isFetching) {
      return <p>Loading producer ...</p>
    }

    return (
      <React.Fragment>
        <Helmet
          title={`${APP_NAME}: ${producer.title}`}
          meta={[
            { name: 'description', content: producer.description },
            { property: 'og:title', content: `${APP_NAME}: ${producer.title}` },
            { property: 'og:description', content: producer.description },
            { property: 'og:type', content: 'profile' },
            { property: 'og:image', content: `${ASSET_BASE}/${producer.avatar}` },
            { property: 'twitter:card', content: 'summary' },
            { property: 'twitter:site', content: `@${TWITTER_HANDLE}` },
            { property: 'twitter:title', content: producer.title },
            { property: 'twitter:description', content: producer.description },
          ]}
        />
        <div className={styles.producer}>
          <Container>
            <div>
              <header className={styles.header}>
                <Avatar className="u-margin-bottom-sm" alt={producer.title} src={`${ASSET_BASE}/${producer.avatar}`} />
                <h1 className={`${styles.title} u-h1`}>{producer.title}</h1>
                <p className={styles.categories}><Categories categories={producer.categories} /></p>
              </header>
              <div className="u-margin-bottom-lg u-3/4@tablet u-center u-text-center">
                <p>{producer.description}</p>
                <ShareProfile
                  isSharing={isSharing}
                  shareProfile={shareProfile}
                  producer={producer}
                />
              </div>
            </div>
          </Container>
          <div className={styles.meta}>
            <Container>
              <List bare className={styles.meta__list}>
                {producer.locality ? (
                  <li className={styles.meta__item}>
                    <a onClick={() => { trackProducerMetaLink('location', producer.user_id) }} className={styles.meta__link} href="#producer-map">
                      <Icon type="location" size="12" /> <span>{producer.locality.title}</span>
                    </a>
                  </li>
                ) : null}
                {producer.website ? (
                  <li className={styles.meta__item}>
                    <a onClick={() => { trackProducerMetaLink('website', producer.user_id) }} className={styles.meta__link} href={producer.website} target="_blank">
                      <Icon type="link" size="12" /> <span>{removeUrlPrefix(producer.website)}</span>
                    </a>
                  </li>
                ) : null}
                {producer.twitter_handle ? (
                  <li className={styles.meta__item}>
                    <a onClick={() => { trackProducerMetaLink('twitter', producer.user_id) }} className={styles.meta__link} href={`https://twitter.com/${producer.twitter_handle}`} target="_blank">
                      <Icon type="twitter" size="12" /> <span>{producer.twitter_handle}</span>
                    </a>
                  </li>
                ) : null}
                {producer.instagram_handle ? (
                  <li className={styles.meta__item}>
                    <a onClick={() => { trackProducerMetaLink('instagram', producer.user_id) }} className={styles.meta__link} href={`https://instagram.com/${producer.instagram_handle}`} target="_blank">
                      <Icon type="instagram" size="12" /> <span>{producer.instagram_handle}</span>
                    </a>
                  </li>
                ) : null}
              </List>
            </Container>
          </div>
          <div id="producer-map">
            <GoogleMap
              longitude={producer.location.coordinates[0]}
              latitude={producer.location.coordinates[1]}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Producer
