// @flow

import React from 'react'
import Container from 'common/components/container'
import { Layout, LayoutItem } from 'common/components/layout'
import Card from './card'

type props = {
  producers: Array<Object>,
  isFetching: boolean,
  hasErrored: boolean,
  userLatLng: Object,
}

const Producers = ({
  producers,
  isFetching,
  hasErrored,
  userLatLng,
}: props) => {
  const { latitude, longitude } = userLatLng

  if (isFetching) {
    return <p>Loading producers ...</p>
  }

  if (hasErrored) {
    return <p>There was an error loading producers</p>
  }

  return (
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
    </Container>
  )
}

export default Producers
