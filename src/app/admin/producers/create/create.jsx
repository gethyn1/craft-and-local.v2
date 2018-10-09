// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'common/components/container'
import { EDIT_PRODUCERS_PATH } from 'common/constants/paths'
import { Form } from './form'

type Props = {
  isFetching: boolean,
  hasErrored: boolean,
  hasUpdated: boolean,
  onSubmit: Function,
}

const Create = ({ hasUpdated, isFetching, hasErrored, onSubmit }: Props) => (
  <Container>
    <h2>Create a producer</h2>
    {hasUpdated && <p>Producer succesfully created <Link to={`${EDIT_PRODUCERS_PATH}`}>Edit producer</Link></p>}
    {isFetching && <p>Creating producer ...</p>}
    {hasErrored && <p>There was an error creating the producer. Please try again</p>}
    <Form onSubmit={onSubmit} />
  </Container>
)

export { Create }
