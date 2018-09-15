// @flow

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Edit } from './edit'
import { updateProducerWithAPI } from '../actions'
import { getProducerWithAPI } from '../../../producer/actions'

type Props = {
  user_id: string,
  producer: Object,
  onSubmit: Function,
  isFetching: boolean,
  hasErrored: boolean,
  hasUpdated: boolean,
  fetchProducer: Function,
}

class EditContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchProducer(this.props.user_id)
  }

  render() {
    return (
      <Edit
        user_id={this.props.user_id}
        producer={this.props.producer}
        isFetching={this.props.isFetching}
        hasErrored={this.props.hasErrored}
        hasUpdated={this.props.hasUpdated}
        onSubmit={this.props.onSubmit}
      />
    )
  }
}

const mapStateToProps = (state: Object, ownProps: Object) => ({
  user_id: ownProps.match.params.userId,
  producer: state.domain.admin.producer.data,
  isFetching: state.domain.admin.producer.meta.isFetching,
  hasErrored: state.domain.admin.producer.meta.hasErrored,
  hasUpdated: state.domain.admin.producer.meta.hasUpdated,
})

const mapDispatchToProps = {
  onSubmit: updateProducerWithAPI,
  fetchProducer: getProducerWithAPI,
}

export const container = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditContainer))
