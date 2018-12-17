// @flow

import React from 'react'
import Container from 'components/container'
import { Notification } from 'components/notification'
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
}

export const Edit = ({
  hasUpdated,
  isFetching,
  hasErrored,
  isUpdating,
  location,
  onSubmit,
  dismissNotification,
}: Props) => (
  <AdminLayout>
    <Container>
      <h2>Edit Location</h2>
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
