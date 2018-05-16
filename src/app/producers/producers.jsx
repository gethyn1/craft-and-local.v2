// @flow

import React from 'react'
import Container from 'common/components/container'
import GoogleMap from 'common/components/google-map'
import { Layout, LayoutItem } from 'common/components/layout'
import Card from './card'

type props = {
  producers: Array<Object>,
  markers: Array<Object>,
  searchProximity: Array<string>,
  producersAtSearchProximity: Array<string>,
  isFetching: boolean,
  hasErrored: boolean,
  userLatLng: Object,
  loadMoreProducers: Function,
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
}: props) => {
  const { latitude, longitude } = userLatLng

  if (isFetching) {
    return <p>Loading producers ...</p>
  }

  if (hasErrored) {
    return <p>There was an error loading producers</p>
  }

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
          <button
            onClick={() => loadMoreProducers({
              latitude,
              longitude,
              searchProximity,
              exclude: producersAtSearchProximity,
            })}
          >
            Load more
          </button>
        </div>
      </Container>
    </div>
  )
}

export default Producers
