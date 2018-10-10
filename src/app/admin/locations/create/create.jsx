// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'common/components/container'
import { EDIT_PRODUCERS_PATH, EDIT_LOCATION_PATH } from 'common/constants/paths'
import { Form } from './form'

export type Props = {
  producer: Object,
  location: Object,
  onSubmit: Function,
  isUpdating: boolean,
  hasUpdated: boolean,
  hasErrored: boolean,
}

const NoProducerDefined = () => (
  <Container><p>There was an error finding the producer.</p></Container>
)

/* eslint-disable-next-line arrow-body-style */
export const Create = ({ producer, location, hasUpdated, hasErrored, isUpdating, onSubmit }: Props) => {
  return producer ? (
    <Container>
      <h2>Create location{producer ? ` for ${producer.user_id}` : null}</h2>
      {producer ?
        <div className="u-margin-bottom">
          <Link to={`${EDIT_PRODUCERS_PATH}/${producer.user_id}`}>
            Back to producer {producer.user_id}
          </Link>
        </div> :
        null}
      {hasUpdated && <p>Location succesfully created. <Link to={`${EDIT_LOCATION_PATH}/${location._id}`}>Edit location</Link></p>}
      {isUpdating && <p>Creating location ...</p>}
      {hasErrored && <p>There was an error creating the location. Please try again</p>}
      <Form producerId={producer._id} onSubmit={onSubmit} />
    </Container>
  ) : <NoProducerDefined />
}
