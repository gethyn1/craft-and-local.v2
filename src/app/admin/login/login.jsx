// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { APP_NAME } from 'src/config'
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
  <React.Fragment>
    <Helmet
      title={`${APP_NAME}: login`}
      meta={[
        { name: 'robots', content: 'noindex, nofollow' },
      ]}
    />
    <Container>
      <h2>Login</h2>
      {hasErrored && <p>Authentication error</p>}
      {isAuthenticating && <p>Loading ...</p>}
      {hasAuthenticated && <Redirect to={referrerPath} />}
      <Form onSubmit={onSubmit} />
    </Container>
  </React.Fragment>
)

export { Login }
