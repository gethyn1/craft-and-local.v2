// @flow

import React from 'react'
import { Helmet } from 'react-helmet'
import Container from 'components/container'
import { Layout, LayoutItem } from 'components/layout'
import { APP_NAME } from '../../config'
import Form from './form'

const Contact = () => (
  <React.Fragment>
    <Helmet
      title={`Contact ${APP_NAME}`}
      meta={[
        { property: 'title', content: `Contact ${APP_NAME}` },
        { name: 'description', content: `Got questions or feedback about ${APP_NAME}? Get in touch with ${APP_NAME}` },
      ]}
    />
    <Container>
      <Layout direction="center">
        <LayoutItem cols="3/4@tablet">
          <div className="u-padding-vertical-xlg u-text-center s-body">
            <h1 className="u-h1">Get in touch</h1>
            <p>Give us feedback or ask any questions about {APP_NAME} using the form below .. hopefully we will have an answer. Either way we will try and get back to you with a response.</p>
          </div>
          <Form />
        </LayoutItem>
      </Layout>
    </Container>
  </React.Fragment>
)

export default Contact
