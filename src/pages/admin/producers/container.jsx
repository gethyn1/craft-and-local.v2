// @flow

import React from 'react'
import { omit } from 'ramda'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { APP_NAME } from 'src/config'
import { producers } from 'src/domain'
import { Producers } from './producers'

type Props = {
  isLoading: boolean,
  hasErrored: boolean,
  getProducers: Function,
  producers: Array<Object>,
}

class ProducersContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.getProducers()
  }

  render() {
    return (
      <React.Fragment>
        <Helmet
          title={`${APP_NAME}: producers`}
          meta={[
            { name: 'robots', content: 'noindex, nofollow' },
          ]}
        />
        <Producers {...omit(['getProducers'], this.props)} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: Object) => ({
  isLoading: state.admin.producers.meta.isLoading,
  hasErrored: state.admin.producers.meta.hasErrored,
  producers: state.admin.producers.data,
})

const mapDispatchToProps = {
  getProducers: producers.actions.getProducersWithAPI,
}

export const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProducersContainer)
