// @flow

import React from 'react'
import { Helmet } from 'react-helmet'
import { path } from 'ramda'
import Button from 'common/components/button'
import Container from 'common/components/container'
import GoogleMap from 'common/components/google-map'
import { Layout, LayoutItem } from 'common/components/layout'
import { APP_NAME, TWITTER_HANDLE } from '../../config'
import Card from './card'
import Filters from './filters'

type Props = {
  getProducers: Function,
  producers: Array<Object>,
  markers: Array<Object>,
  searchProximity: Array<string>,
  producersAtSearchProximity: Array<string>,
  isFetching: boolean,
  hasErrored: boolean,
  loadMoreProducers: Function,
  noMoreProducers: boolean,
  categories: Array<Object>,
  latitude: number,
  longitude: number,
  userLocationHasLoaded: boolean,
  category: Object,
  categoriesHaveLoaded: boolean,
  resetProducers: Function,
  categoryNotFound: boolean,
  pageNotFound: Function,
}

type State = {
  hasFetched: boolean,
}

class Producers extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = { hasFetched: false }
    this.loadMoreProducers = this.loadMoreProducers.bind(this)
  }

  componentDidMount() {
    this.getProducers()
  }

  componentDidUpdate(prevProps: Props) {
    this.getProducers()

    if (prevProps.category !== this.props.category && this.state.hasFetched) {
      this.categoryDidUpdate()
    }
  }

  componentWillUnmount() {
    this.props.resetProducers()
  }

  getProducers() {
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
      this.props.getProducers({ latitude, longitude, categories: path(['_id'], category) })
      this.setState({ hasFetched: true })
    }

    if (categoriesHaveLoaded && categoryNotFound) {
      pageNotFound()
    }
  }

  loadMoreProducers = () => {
    const {
      latitude,
      longitude,
      category,
      searchProximity,
      producersAtSearchProximity,
    } = this.props

    this.props.loadMoreProducers({
      latitude,
      longitude,
      searchProximity,
      exclude: producersAtSearchProximity,
      categories: path(['_id'], category),
    })
  }

  categoryDidUpdate() {
    this.props.resetProducers()
    this.setState({ hasFetched: false })
  }

  render() {
    const {
      isFetching,
      hasErrored,
      producers,
      markers,
      latitude,
      longitude,
      noMoreProducers,
      categories,
      category,
    } = this.props

    return (
      <React.Fragment>
        <Helmet
          title={`${APP_NAME}${category ? `: ${category.title}` : ': all producers'}`}
          meta={[
            { name: 'description', content: 'Local producers and market traders' },
            { property: 'og:title', content: `${APP_NAME}${category ? `: ${category.title}` : ': all producers'}` },
            { property: 'og:description', content: 'Local producers and market traders' },
            { property: 'og:type', content: 'website' },
            { property: 'twitter:card', content: 'summary' },
            { property: 'twitter:site', content: `@${TWITTER_HANDLE}` },
            { property: 'twitter:title', content: APP_NAME },
            { property: 'twitter:description', content: `${APP_NAME}${category ? `: ${category.title}` : ': all producers'}` },
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
                producers.length
                ? producers.map(producer => (
                  <LayoutItem key={producer._id} cols="1/3@tablet" className="u-margin-bottom">
                    <Card producer={producer} lat={latitude} lng={longitude} />
                  </LayoutItem>))
                : (<p>No producers</p>)
              }
            </Layout>
            <div className="u-margin-bottom-lg">
              {isFetching ? <p>Loading producers ...</p> : null}
              {hasErrored ? <p>There was an error loading producers</p> : null}
            </div>
            <div className="u-margin-bottom-lg">
              {noMoreProducers ?
                <p>That is all the producers we have right now</p> :
                <Button
                  data-test-id="producers/load-more"
                  disabled={isFetching || hasErrored || noMoreProducers}
                  onClick={this.loadMoreProducers}
                >
                Load more
                </Button>}
            </div>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Producers
