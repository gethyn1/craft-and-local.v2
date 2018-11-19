// @flow

import React from 'react'
import { Helmet } from 'react-helmet'
import { path } from 'ramda'
import { Button } from 'common/components/button'
import Container from 'common/components/container'
import GoogleMap from 'common/components/google-map'
import { Layout, LayoutItem } from 'common/components/layout'
import { PRODUCERS_PATH } from 'common/constants/paths'
import { APP_URL, APP_NAME, TWITTER_HANDLE } from '../../config'
import { LOAD_MORE_LOCATIONS_TEST_ID } from './constants'
import Card from './card'
import Filters from './filters'

type Props = {
  getLocations: Function,
  locations: Array<Object>,
  markers: Array<Object>,
  searchProximity: Array<string>,
  locationsAtSearchProximity: Array<string>,
  isFetching: boolean,
  hasErrored: boolean,
  loadMoreLocations: Function,
  noMoreLocations: boolean,
  categories: Array<Object>,
  latitude: number,
  longitude: number,
  userLocationHasLoaded: boolean,
  category: Object,
  categoriesHaveLoaded: boolean,
  resetLocations: Function,
  categoryNotFound: boolean,
  pageNotFound: Function,
}

type State = {
  hasFetched: boolean,
}

export class Locations extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = { hasFetched: false }
    this.loadMoreLocations = this.loadMoreLocations.bind(this)
  }

  componentDidMount() {
    this.getLocations()
  }

  componentDidUpdate(prevProps: Props) {
    this.getLocations()

    if (prevProps.category !== this.props.category && this.state.hasFetched) {
      this.categoryDidUpdate()
    }
  }

  componentWillUnmount() {
    this.props.resetLocations()
  }

  getLocations() {
    const {
      categoriesHaveLoaded,
      userLocationHasLoaded,
      latitude,
      longitude,
      category,
      categoryNotFound,
      pageNotFound,
    } = this.props

    if (!this.state.hasFetched && categoriesHaveLoaded && userLocationHasLoaded) {
      this.props.getLocations({ latitude, longitude, categories: path(['_id'], category) })
      this.setState({ hasFetched: true })
    }

    if (categoriesHaveLoaded && categoryNotFound) {
      pageNotFound()
    }
  }

  loadMoreLocations = () => {
    const {
      latitude,
      longitude,
      category,
      searchProximity,
      locationsAtSearchProximity,
      locations,
    } = this.props

    this.props.loadMoreLocations({
      latitude,
      longitude,
      searchProximity,
      exclude: locationsAtSearchProximity,
      categories: path(['_id'], category),
      categorySlug: path(['title'], category),
      count: locations ? locations.length : null,
    })
  }

  categoryDidUpdate() {
    this.props.resetLocations()
    this.setState({ hasFetched: false })
  }

  render() {
    const {
      isFetching,
      hasErrored,
      locations,
      markers,
      latitude,
      longitude,
      noMoreLocations,
      categories,
      category,
    } = this.props

    return (
      <React.Fragment>
        <Helmet
          title={`${APP_NAME}${category ? `: ${category.title}` : ': all locations'}`}
          meta={[
            { name: 'description', content: 'Local locations and market traders' },
            { property: 'og:title', content: `${APP_NAME}${category ? `: ${category.title}` : ': all locations'}` },
            { property: 'og:description', content: 'Local locations and market traders' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: `${APP_URL}${PRODUCERS_PATH}` },
            { property: 'twitter:card', content: 'summary' },
            { property: 'twitter:site', content: `@${TWITTER_HANDLE}` },
            { property: 'twitter:title', content: APP_NAME },
            { property: 'twitter:description', content: `${APP_NAME}${category ? `: ${category.title}` : ': all locations'}` },
          ]}
        />
        <div>
          <div style={{ height: '400px' }} className="u-margin-bottom">
            <GoogleMap
              markers={markers}
              latitude={latitude}
              longitude={longitude}
              addCenterMarker={false}
              zoom={12}
            />
          </div>
          <Container>
            <Filters categories={categories} active={path(['_id'], category)} />
            <Layout>
              {
                locations.length
                ? locations.map(location => (
                  <LayoutItem key={location._id} cols="1/3@tablet" className="u-margin-bottom">
                    <Card location={location} lat={latitude} lng={longitude} />
                  </LayoutItem>))
                : (<p>No locations</p>)
              }
            </Layout>
            <div className="u-margin-bottom-lg">
              {isFetching ? <p>Loading locations ...</p> : null}
              {hasErrored ? <p>There was an error loading locations</p> : null}
            </div>
            <div className="u-margin-bottom-lg">
              {noMoreLocations ? <p>That is all the locations we have right now</p> : null}
              {!noMoreLocations && this.state.hasFetched ?
                <Button
                  data-test-id={LOAD_MORE_LOCATIONS_TEST_ID}
                  disabled={isFetching || hasErrored || noMoreLocations}
                  onClick={this.loadMoreLocations}
                >
                  Load more
                </Button> :
              null}
            </div>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}
