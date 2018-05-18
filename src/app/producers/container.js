// @flow

import { connect } from 'react-redux'
import actions from './actions'
import Producers from './producers'

const mapStateToProps = (state: Object, ownProps: Object) => {
  const categoryFromRoute = ownProps.match.params.category
  const category = state.domain.categories.data.find(cat => cat.slug === categoryFromRoute)

  return {
    producers: state.domain.producers.data.producers,
    markers: state.domain.producers.data.markers,
    searchProximity: state.domain.producers.data.searchProximity,
    producersAtSearchProximity: state.domain.producers.data.producersAtSearchProximity,
    noMoreProducers: state.domain.producers.meta.noMoreProducers,
    isFetching: state.domain.producers.meta.isFetching,
    hasErrored: state.domain.producers.meta.hasErrored,
    userLocationHasLoaded: state.user.location.meta.hasFetched,
    latitude: state.user.location.data.latitude,
    longitude: state.user.location.data.longitude,
    categories: state.domain.categories.data,
    category,
    categoriesHaveLoaded: state.domain.categories.meta.hasFetched,
  }
}

const mapDispatchToProps = ({
  getProducers: actions.getProducersWithAPI,
  loadMoreProducers: actions.loadMoreProducersWithAPI,
  resetProducers: actions.resetProducers,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Producers)
