// @flow

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import { omit } from 'ramda'
import { APP_NAME } from 'src/config'
import { producer, location } from 'src/domain'
import { Create } from './create'
import type { Props } from './create'

const { createLocationWithAPI, resetLocationMeta } = location.actions
const { getProducerWithAPI } = producer.actions

type ContainerProps = {
  ...Props,
  producerId: string,
  getProducer: Function,
}

class CreateContainer extends React.Component<ContainerProps> {
  componentDidMount() {
    this.props.getProducer(this.props.producerId)
  }

  render() {
    const props = omit(['getProducer', 'producerId'], this.props)

    return (
      <React.Fragment>
        <Helmet
          title={`${APP_NAME}: create location`}
          meta={[
            { name: 'robots', content: 'noindex, nofollow' },
          ]}
        />
        <Create {...props} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: Object, ownProps: Object) => ({
  producerId: ownProps.match.params.producerId,
  location: state.admin.location.data,
  producer: state.admin.producer.data,
  hasErrored: state.admin.location.meta.hasErrored,
  isUpdating: state.admin.location.meta.isUpdating,
  hasUpdated: state.admin.location.meta.hasUpdated,
})

const mapDispatchToProps = {
  onSubmit: createLocationWithAPI,
  getProducer: getProducerWithAPI,
  dismissNotification: resetLocationMeta,
}

export const container = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateContainer))
