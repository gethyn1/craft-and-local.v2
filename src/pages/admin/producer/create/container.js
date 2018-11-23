// @flow

import { path } from 'ramda'
import { connect } from 'react-redux'
import { producer } from 'src/domain'
import { Create } from './create'

const mapStateToProps = (state: Object) => {
  const producerState = path(['admin', 'producer'], state)
  const meta = path(['meta'], producerState)
  const data = path(['data'], producerState)

  return {
    isFetching: path(['isFetching'], meta),
    hasErrored: path(['hasErrored'], meta),
    hasUpdated: path(['hasUpdated'], meta),
    producerId: path(['userId'], data),
  }
}

const mapDispatchToProps = {
  onSubmit: producer.actions.createProducerWithAPI,
}

export const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Create)
