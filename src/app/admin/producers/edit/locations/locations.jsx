// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { EDIT_LOCATION_PATH, CREATE_LOCATION_PATH } from 'common/constants/paths'

type Props = {
  isLoading: boolean,
  hasErrored: boolean,
  locations: Array<Object>,
  producerId: String,
}

const Locations = ({ isLoading, hasErrored, locations, producerId }: Props) => {
  if (isLoading || !locations) {
    return <p>Loading...</p>
  }

  if (hasErrored) {
    return <p>Sorry, there was an error getting locations for this producer.</p>
  }

  return (
    <div>
      <ul>
        {locations.map(location => (
          <li key={location._id}>
            <Link to={`${EDIT_LOCATION_PATH}/${location._id}`}>{location.alias || location.address}</Link>
          </li>
        ))}
      </ul>
      <Link to={CREATE_LOCATION_PATH(producerId)}>+ Add location</Link>
    </div>
  )
}

export { Locations }
