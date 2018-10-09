// @flow

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { location } from 'src/domain'
import { Edit } from './edit'

const { getLocationWithAPI, updateLocationWithAPI } = location.actions

type Props = {
  id: string,
  location: Object,
  activeProducer: Object,
  getLocation: Function,
  isFetching: boolean,
  hasErrored: boolean,
  isUpdating: boolean,
  hasUpdated: boolean,
  geoCodingOptions: Array<Object>,
  geoCodingLookup: Function,
  onGeoCodingSelect: Function,
  categories: Array<Object>,
  onSubmit: Function,
}

class EditContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.getLocation(this.props.id)
  }

  render() {
    return (
      <Edit
        location={this.props.location}
        activeProducer={this.props.activeProducer}
        isFetching={this.props.isFetching}
        hasErrored={this.props.hasErrored}
        isUpdating={this.props.isUpdating}
        hasUpdated={this.props.hasUpdated}
        geoCodingOptions={this.props.geoCodingOptions}
        categories={this.props.categories}
        geoCodingLookup={this.props.geoCodingLookup}
        onGeoCodingSelect={this.props.onGeoCodingSelect}
        onSubmit={this.props.onSubmit}
      />
    )
  }
}

const mapStateToProps = (state: Object, ownProps: Object) => ({
  id: ownProps.match.params.id,
  location: state.domain.admin.location.data,
  activeProducer: state.domain.admin.location.activeProducer,
  isFetching: state.domain.admin.location.meta.isFetching,
  hasErrored: state.domain.admin.location.meta.hasErrored,
  isUpdating: state.domain.admin.location.meta.isUpdating,
  hasUpdated: state.domain.admin.location.meta.hasUpdated,
  categories: state.domain.categories.data,
})

const mapDispatchToProps = {
  getLocation: getLocationWithAPI,
  onSubmit: updateLocationWithAPI,
}

export const container = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditContainer))
