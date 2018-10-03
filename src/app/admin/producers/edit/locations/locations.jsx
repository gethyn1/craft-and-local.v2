// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { EDIT_LOCATION_PATH } from 'common/constants/paths'

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
      {locations.map(location => (
        <li key={location._id}>
          <Link to={`${EDIT_LOCATION_PATH}/${location._id}`}>{location.address}</Link>
        </li>
      ))}
    </ul>
  )
}

export { Locations }
