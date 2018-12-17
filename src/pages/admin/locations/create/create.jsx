// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'components/container'
import { Notification } from 'components/notification'
import { EDIT_PRODUCERS_PATH, EDIT_LOCATION_PATH } from 'common/constants/paths'
import { Form } from './form'
import { AdminLayout } from '../../../../layouts/admin-layout'

export type Props = {
  producer: Object,
  location: Object,
  onSubmit: Function,
  isUpdating: boolean,
  hasUpdated: boolean,
  hasErrored: boolean,
  dismissNotification: Function,
}

const NoProducerDefined = () => (
  <Container><p>There was an error finding the producer.</p></Container>
)

/* eslint-disable-next-line arrow-body-style */
export const Create = ({ producer, location, hasUpdated, hasErrored, isUpdating, onSubmit, dismissNotification }: Props) => {
  return (
    <AdminLayout>
      {producer ? (
        <Container>
          <h2>Create location{producer ? ` for ${producer.userId}` : null}</h2>
          {producer ?
            <div className="u-margin-bottom">
              <Link to={`${EDIT_PRODUCERS_PATH}/${producer.userId}`}>
                Back to producer {producer.userId}
              </Link>
            </div> :
            null}
          {hasUpdated && <p>Location succesfully created. <Link to={`${EDIT_LOCATION_PATH}/${location._id}`}>Edit location</Link></p>}
          {isUpdating && <Notification message="Creating location ..." />}
          {hasErrored && <Notification onDismiss={dismissNotification} status="error" message="There was an error creating the producer. Please try again" />}
          <Form disabled={isUpdating} producerId={producer._id} onSubmit={onSubmit} />
        </Container>
    ) : <NoProducerDefined />}
    </AdminLayout>
  )
}
