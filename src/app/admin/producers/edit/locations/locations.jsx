// @flow

import React from 'react'

type Props = {
  isLoading: boolean,
  hasErrored: boolean,
  locations: Array<Object>,
}

const Locations = ({ isLoading, hasErrored, locations }: Props) => {
  if (isLoading || !locations) {
    return <p>Loading...</p>
  }

  if (hasErrored) {
    return <p>Sorry, there was an error getting locations for this producer.</p>
  }

  return (
    <ul>
      {locations.map(location => <li key={location._id}>{location.address}</li>)}
    </ul>
  )
}

export { Locations }
