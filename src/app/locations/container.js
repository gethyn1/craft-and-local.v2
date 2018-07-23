// @flow

import { connect } from 'react-redux'
import { equals, path } from 'ramda'
import { getLocationsWithAPI, loadMoreLocationsWithAPI, resetLocations } from './actions'
import { pageNotFound } from '../actions'
import Locations from './locations'

const mapStateToProps = (state: Object, ownProps: Object) => {
  const categoryFromRoute = ownProps.match.params.category
  const category = state.domain.categories.data.find(cat => cat.slug === categoryFromRoute)
  const categoryNotFound = !equals(categoryFromRoute, path(['slug'], category))

  return {
    locations: state.domain.locations.data.locations,
    markers: state.domain.locations.data.markers,
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
