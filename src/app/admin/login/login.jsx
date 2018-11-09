// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'
import Container from 'common/components/container'
import { Form } from './form'

type Props = {
  isAuthenticating: boolean,
  hasErrored: boolean,
  hasAuthenticated: boolean,
  onSubmit: Function,
  referrerPath: ?string,
}

const Login = ({ isAuthenticating, hasErrored, hasAuthenticated, onSubmit, referrerPath }: Props) => (
  <Container>
    <h2>Login</h2>
    {hasErrored && <p>Authentication error</p>}
    {isAuthenticating && <p>Loading ...</p>}
    {hasAuthenticated && <Redirect to={referrerPath} />}
    <Form onSubmit={onSubmit} />
  </Container>
)

export { Login }
