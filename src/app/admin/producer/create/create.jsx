// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { APP_NAME } from 'src/config'
import Container from 'common/components/container'
import { EDIT_PRODUCERS_PATH } from 'common/constants/paths'
import { Form } from './form'

type Props = {
  isFetching: boolean,
  hasErrored: boolean,
  hasUpdated: boolean,
  onSubmit: Function,
  producerId: string,
}

const Create = ({ hasUpdated, isFetching, hasErrored, onSubmit, producerId }: Props) => (
  <React.Fragment>
    <Helmet
      title={`${APP_NAME}: create producer`}
      meta={[
        { name: 'robots', content: 'noindex, nofollow' },
      ]}
    />
    <Container>
      <h2>Create a producer</h2>
      {hasUpdated && <p>Producer succesfully created <Link to={`${EDIT_PRODUCERS_PATH}/${producerId}`}>Edit producer</Link></p>}
      {isFetching && <p>Creating producer ...</p>}
      {hasErrored && <p>There was an error creating the producer. Please try again</p>}
      <Form onSubmit={onSubmit} />
    </Container>
  </React.Fragment>
)

export { Create }
