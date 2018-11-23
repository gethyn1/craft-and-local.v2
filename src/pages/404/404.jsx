// @flow

import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Container from 'components/container'
import { Layout, LayoutItem } from 'components/layout'
import { PRODUCERS_PATH, CONTACT_PATH } from 'common/constants/paths'
import { DefaultLayout } from '../../layouts/default-layout'

type Props = {
  trackPageNotFound: Function,
  resetPageErrors: Function,
  path: string,
}

class NotFound extends React.Component<Props> {
  componentDidMount() {
    this.props.trackPageNotFound(this.props.path)
  }

  componentWillUnmount() {
    this.props.resetPageErrors()
  }

  render() {
    return (
      <React.Fragment>
        <Helmet
          title="Page not found"
          meta={[
            { property: 'title', content: 'Page not found' },
            { name: 'robots', content: 'noindex' },
          ]}
        />
        <DefaultLayout>
          <Container>
            <Layout direction="center">
              <LayoutItem cols="3/4@tablet">
                <div className="u-padding-vertical-xlg u-text-center s-body">
                  <h1 className="u-h1">Uh-oh!</h1>
                  <p>The page you are looking for doesn&#39;t exist ...</p>
                  <p>You can browse your <Link to={PRODUCERS_PATH}>local producers</Link> or ask us a question on our <Link to={CONTACT_PATH}>contact page</Link>.</p>
                </div>
              </LayoutItem>
            </Layout>
          </Container>
        </DefaultLayout>
      </React.Fragment>
    )
  }
}

export default NotFound
