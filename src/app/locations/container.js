// @flow

import { connect } from 'react-redux'
import { equals, path } from 'ramda'
import { locations } from 'src/domain'
import { pageNotFound } from '../actions'
import Locations from './locations'

const { getLocationsWithAPI, loadMoreLocationsWithAPI, resetLocations } = locations.actions

const mapStateToProps = (state: Object, ownProps: Object) => {
  const categoryFromRoute = ownProps.match.params.category
  const category = state.domain.categories.data.find(cat => cat.slug === categoryFromRoute)
  const categoryNotFound = !equals(categoryFromRoute, path(['slug'], category))

  return {
    locations: locations.selectors.locations(state),
    markers: locations.selectors.markers(state),
    searchProximity: state.domain.locations.data.searchProximity,
    locationsAtSearchProximity: state.domain.locations.data.locationsAtSearchProximity,
    noMoreLocations: state.domain.locations.meta.noMoreLocations,
    isFetching: state.domain.locations.meta.isFetching,
    hasErrored: state.domain.locations.meta.hasErrored,
    userLocationHasLoaded: state.domain.user.location.meta.hasFetched,
    latitude: state.domain.user.location.data.latitude,
    longitude: state.domain.user.location.data.longitude,
    categories: state.domain.categories.data,
    category,
    categoriesHaveLoaded: state.domain.categories.meta.hasFetched,
    categoryNotFound,
  }
}

const mapDispatchToProps = {
  getLocations: getLocationsWithAPI,
  loadMoreLocations: loadMoreLocationsWithAPI,
  resetLocations,
  pageNotFound,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Locations)
