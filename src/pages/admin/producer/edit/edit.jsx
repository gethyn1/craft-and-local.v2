// @flow

import React from 'react'
import { Helmet } from 'react-helmet'
import Container from 'components/container'
import { Notification } from 'components/notification'
import { APP_NAME } from 'src/config'
import { Avatar } from './avatar'
import { Locations } from './locations'
import { Form } from './form'
import { AdminLayout } from '../../../../layouts/admin-layout'

type Props = {
  userId: string,
  producer: Object,
  onSubmit: Function,
  isFetching: boolean,
  hasErrored: boolean,
  isUpdating: boolean,
  hasUpdated: boolean,
  categories: ?Array<Object>,
  locations: ?Array<Object>,
  locationsIsLoading: boolean,
  locationsHasErrored: boolean,
  dismissNotification: Function,
}

const Edit = (props: Props) => (
  <React.Fragment>
    <Helmet
      title={`${APP_NAME}: edit producer`}
      meta={[
        { name: 'robots', content: 'noindex, nofollow' },
      ]}
    />
    <AdminLayout>
      <Container>
        <h2>Edit Producer: {props.userId}</h2>
        <h3>Edit avatar</h3>
        <Avatar />
        {props.hasUpdated && <Notification onDismiss={props.dismissNotification} status="success" message="Producer succesfully updated" />}
        {props.isFetching && <Notification status="task" message="Loading producer ..." />}
        {props.isUpdating && <Notification status="task" message="Updating producer ..." />}
        {props.hasErrored && <Notification onDismiss={props.dismissNotification} status="error" message="There was an error updating the producer. Please try again" />}
        <Form
          producer={props.producer}
          onSubmit={props.onSubmit}
          categories={props.categories}
          userId={props.userId}
          disabled={props.isFetching || props.isUpdating}
        />
        <h3>Producer locations</h3>
        <Locations
          isLoading={props.locationsIsLoading}
          hasErrored={props.locationsHasErrored}
          locations={props.locations}
          producerId={props.userId}
        />
      </Container>
    </AdminLayout>
  </React.Fragment>
)

export { Edit }
