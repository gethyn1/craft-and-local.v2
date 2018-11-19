// @flow

import { path } from 'ramda'
import { connect } from 'react-redux'
import { Create } from './create'
import { createProducerWithAPI } from '../actions'

const mapStateToProps = (state: Object) => {
  const producer = path(['domain', 'admin', 'producer'], state)
  const meta = path(['meta'], producer)
  const data = path(['data'], producer)

  return {
    isFetching: path(['isFetching'], meta),
    hasErrored: path(['hasErrored'], meta),
    hasUpdated: path(['hasUpdated'], meta),
    producerId: path(['userId'], data),
  }
}

const mapDispatchToProps = {
  onSubmit: createProducerWithAPI,
}

export const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Create)
