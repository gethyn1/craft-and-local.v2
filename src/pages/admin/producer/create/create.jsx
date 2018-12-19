// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { APP_NAME } from 'src/config'
import Container from 'components/container'
import { Notification } from 'components/notification'
import { EDIT_PRODUCERS_PATH } from 'common/constants/paths'
import { Form } from './form'
import { AdminLayout } from '../../../../layouts/admin-layout'

type Props = {
  isFetching: boolean,
  hasErrored: boolean,
  hasUpdated: boolean,
  onSubmit: Function,
  producerId: string,
  dismissNotification: Function,
}

const Create = ({ hasUpdated, isFetching, hasErrored, onSubmit, producerId, dismissNotification }: Props) => (
  <React.Fragment>
    <Helmet
      title={`${APP_NAME}: create producer`}
      meta={[
        { name: 'robots', content: 'noindex, nofollow' },
      ]}
    />
    <AdminLayout>
      <Container>
        <h2>Create a producer</h2>
        {hasUpdated && <p>Producer succesfully created <Link to={`${EDIT_PRODUCERS_PATH}/${producerId}`}>Edit producer</Link></p>}
        {isFetching && <Notification message="Creating producer ..." />}
        {hasErrored && <Notification onDismiss={dismissNotification} status="error" message="There was an error creating the producer. Please try again" />}
        <Form onSubmit={onSubmit} disabled={isFetching} />
      </Container>
    </AdminLayout>
  </React.Fragment>
)

export { Create }
