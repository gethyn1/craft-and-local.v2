// @flow

import React from 'react'
import { Helmet } from 'react-helmet'
import Container from 'components/container'
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
  hasUpdated: boolean,
  categories: ?Array<Object>,
  locations: ?Array<Object>,
  locationsIsLoading: boolean,
  locationsHasErrored: boolean,
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
        <h2>Producer locations</h2>
        <Locations
          isLoading={props.locationsIsLoading}
          hasErrored={props.locationsHasErrored}
          locations={props.locations}
          producerId={props.userId}
        />
        <h2>Edit avatar</h2>
        <Avatar />
        <h2>Edit Producer: {props.userId}</h2>
        {props.hasUpdated && <p>Producer succesfully updated</p>}
        {props.isFetching && <p>Updating producer ...</p>}
        {props.hasErrored && <p>There was an error updating the producer. Please try again</p>}
        <Form
          producer={props.producer}
          onSubmit={props.onSubmit}
          categories={props.categories}
          userId={props.userId}
        />
      </Container>
    </AdminLayout>
  </React.Fragment>
)

export { Edit }
