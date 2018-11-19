// @flow

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import { APP_NAME } from 'src/config'
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
      <React.Fragment>
        <Helmet
          title={`${APP_NAME}: edit location`}
          meta={[
            { name: 'robots', content: 'noindex, nofollow' },
          ]}
        />
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
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: Object, ownProps: Object) => ({
  id: ownProps.match.params.id,
  location: state.admin.location.data,
  activeProducer: state.admin.location.activeProducer,
  isFetching: state.admin.location.meta.isFetching,
  hasErrored: state.admin.location.meta.hasErrored,
  isUpdating: state.admin.location.meta.isUpdating,
  hasUpdated: state.admin.location.meta.hasUpdated,
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
