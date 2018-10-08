// @flow

import React from 'react'
// import { Link } from 'react-router-dom'
import Container from 'common/components/container'
// import { EDIT_PRODUCERS_PATH } from 'common/constants/paths'
import { Form } from './form'

type Props = {
  location: Object,
  onSubmit: Function,
  isFetching: boolean,
  hasErrored: boolean,
  isUpdating: boolean,
  hasUpdated: boolean,
  geoCodingOptions: ?Array<Object>,
  geoCodingLookup: Function,
  onGeoCodingSelect: Function,
  categories: ?Array<Object>,
}

export const Edit = ({
  hasUpdated,
  isFetching,
  hasErrored,
  isUpdating,
  location,
  onSubmit,
  geoCodingOptions,
  geoCodingLookup,
  onGeoCodingSelect,
  categories,
}: Props) => (
  <Container>
    <h2>Edit Location</h2>
    {hasUpdated && <p>Location succesfully updated</p>}
    {isFetching && <p>Loading location ...</p>}
    {isUpdating && <p>Updating location ...</p>}
    {hasErrored && <p>There was an error updating the location. Please try again</p>}
    {!isFetching && <Form
      location={location}
      onSubmit={onSubmit}
      geoCodingOptions={geoCodingOptions}
      geoCodingLookup={geoCodingLookup}
      onGeoCodingSelect={onGeoCodingSelect}
      categories={categories}
    />}
  </Container>
)
