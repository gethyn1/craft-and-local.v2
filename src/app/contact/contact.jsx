// @flow

import React from 'react'
import { Helmet } from 'react-helmet'
import Container from 'common/components/container'
import { Layout, LayoutItem } from 'common/components/layout'
import { APP_NAME } from '../../config'

const Contact = () => (
  <React.Fragment>
    <Helmet
      title={`About ${APP_NAME}`}
      meta={[
        { property: 'title', content: `About ${APP_NAME}` },
        { name: 'description', content: `Background and roadmap for ${APP_NAME}` },
      ]}
    />
    <Container>
      <Layout direction="center">
        <LayoutItem cols="3/4@tablet">
          <div className="u-padding-vertical-xlg u-text-center s-body">
            <h1 className="u-h1">Get in touch</h1>
            <p>The contact page</p>
          </div>
        </LayoutItem>
      </Layout>
    </Container>
  </React.Fragment>
)

export default Contact
