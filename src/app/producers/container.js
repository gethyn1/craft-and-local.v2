// @flow

import { connect } from 'react-redux'
import { equals, path } from 'ramda'
import { getProducersWithAPI, loadMoreProducersWithAPI, resetProducers } from './actions'
import { pageNotFound } from '../actions'
import Producers from './producers'

const mapStateToProps = (state: Object, ownProps: Object) => {
  const categoryFromRoute = ownProps.match.params.category
  const category = state.domain.categories.data.find(cat => cat.slug === categoryFromRoute)
  const categoryNotFound = !equals(categoryFromRoute, path(['slug'], category))

  return {
    producers: state.domain.producers.data.producers,
    markers: state.domain.producers.data.markers,
    searchProximity: state.domain.producers.data.searchProximity,
    producersAtSearchProximity: state.domain.producers.data.producersAtSearchProximity,
    noMoreProducers: state.domain.producers.meta.noMoreProducers,
    isFetching: state.domain.producers.meta.isFetching,
    hasErrored: state.domain.producers.meta.hasErrored,
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
  getProducers: getProducersWithAPI,
  loadMoreProducers: loadMoreProducersWithAPI,
  resetProducers,
  pageNotFound,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Producers)
