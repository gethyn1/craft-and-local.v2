// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'components/container'
import { Notification } from 'components/notification'
import { EDIT_PRODUCERS_PATH } from 'common/constants/paths'
import { Form } from './form'
import { AdminLayout } from '../../../../layouts/admin-layout'

type Props = {
  location: Object,
  onSubmit: Function,
  isFetching: boolean,
  hasErrored: boolean,
  isUpdating: boolean,
  hasUpdated: boolean,
  dismissNotification: Function,
  producer: Object,
}

export const Edit = ({
  hasUpdated,
  isFetching,
  hasErrored,
  isUpdating,
  location,
  onSubmit,
  dismissNotification,
  producer,
}: Props) => (
  <AdminLayout>
    <Container>
      <h2>Edit Location</h2>
      {producer && <p><Link to={`${EDIT_PRODUCERS_PATH}/${producer.userId}`}>Back to producer</Link></p>}
      {hasUpdated && <Notification onDismiss={dismissNotification} message="Location succesfully updated" />}
      {isFetching && <Notification message="Loading location ..." />}
      {isUpdating && <Notification message="Updating location ..." />}
      {hasErrored && <Notification onDismiss={dismissNotification} status="error" message="There was an error updating the location. Please try again" />}
      {!isFetching && <Form
        location={location}
        onSubmit={onSubmit}
        disabled={isFetching || isUpdating}
      />}
    </Container>
  </AdminLayout>
)
