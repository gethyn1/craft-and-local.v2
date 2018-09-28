// @flow

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { geocoding, location } from 'src/domain'
import { Edit } from './edit'
import { updateProducerWithAPI } from '../actions'

const { getProducerWithAPI } = location.actions

const {
  geocodingGetLatLngFromAddress,
  geocodingAddressLookupReset,
} = geocoding.actions

type Props = {
  user_id: string,
  producer: Object,
  onSubmit: Function,
  isFetching: boolean,
  hasErrored: boolean,
  hasUpdated: boolean,
  fetchProducer: Function,
  geoCodingOptions: ?Array<Object>,
  geoCodingLookup: Function,
  onGeoCodingSelect: Function,
  categories: ?Array<Object>,
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
        geoCodingOptions={this.props.geoCodingOptions}
        geoCodingLookup={this.props.geoCodingLookup}
        onGeoCodingSelect={this.props.onGeoCodingSelect}
        categories={this.props.categories}
      />
    )
  }
}

const formatGeoCodingOption = (option: Object) => ({
  id: option.id,
  option: option.address,
  value: `${option.lng},${option.lat}`,
})

const mapStateToProps = (state: Object, ownProps: Object) => ({
  user_id: ownProps.match.params.userId,
  producer: state.domain.admin.producer.data,
  isFetching: state.domain.admin.producer.meta.isFetching,
  hasErrored: state.domain.admin.producer.meta.hasErrored,
  hasUpdated: state.domain.admin.producer.meta.hasUpdated,
  geoCodingOptions: state.domain.geocoding.data.addressLookupOptions.map(formatGeoCodingOption),
  categories: state.domain.categories.data,
})

const mapDispatchToProps = {
  onSubmit: updateProducerWithAPI,
  fetchProducer: getProducerWithAPI,
  geoCodingLookup: geocodingGetLatLngFromAddress,
  onGeoCodingSelect: geocodingAddressLookupReset,
}

export const container = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditContainer))
