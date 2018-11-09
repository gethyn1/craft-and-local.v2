// @flow

import React from 'react'
import { omit } from 'ramda'
import { connect } from 'react-redux'
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
    return <Producers {...omit(['getProducers'], this.props)} />
  }
}

const mapStateToProps = (state: Object) => ({
  isLoading: state.domain.admin.producers.meta.isLoading,
  hasErrored: state.domain.admin.producers.meta.hasErrored,
  producers: state.domain.admin.producers.data,
})

const mapDispatchToProps = {
  getProducers: producers.actions.getProducersWithAPI,
}

export const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProducersContainer)
