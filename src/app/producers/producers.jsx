// @flow

import React from 'react'
import Container from 'common/components/container'
import GoogleMap from 'common/components/google-map'
import { Layout, LayoutItem } from 'common/components/layout'
import Card from './card'
import Filters from './filters'

type props = {
  producers: Array<Object>,
  markers: Array<Object>,
  searchProximity: Array<string>,
  producersAtSearchProximity: Array<string>,
  isFetching: boolean,
  hasErrored: boolean,
  userLatLng: Object,
  loadMoreProducers: Function,
  noMoreProducers: boolean,
  categories: Array<Object>,
}

const Producers = ({
  producers,
  markers,
  searchProximity,
  producersAtSearchProximity,
  isFetching,
  hasErrored,
  userLatLng,
  loadMoreProducers,
  noMoreProducers,
  categories,
}: props) => {
  const { latitude, longitude } = userLatLng

  return (
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
        <Filters categories={categories} active="" />
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
            <button
              disabled={isFetching || hasErrored || noMoreProducers}
              onClick={() => loadMoreProducers({
                latitude,
                longitude,
                searchProximity,
                exclude: producersAtSearchProximity,
              })}
            >
            Load more
            </button>}
        </div>
      </Container>
    </div>
  )
}

export default Producers
