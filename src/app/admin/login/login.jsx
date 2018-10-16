// @flow

import React from 'react'
import Container from 'common/components/container'
import { Form } from './form'

type Props = {
  isAuthenticating: boolean,
  hasErrored: boolean,
  hasAuthenticated: boolean,
  onSubmit: Function,
}

const Login = ({ isAuthenticating, hasErrored, hasAuthenticated, onSubmit }: Props) => (
  <Container>
    <h2>Login</h2>
    {hasErrored && <p>Authentication error</p>}
    {isAuthenticating && <p>Loading ...</p>}
    {hasAuthenticated && <p>Great - you have logged in!!</p>}
    <Form onSubmit={onSubmit} />
  </Container>
)

export { Login }
