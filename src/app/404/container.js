import { connect } from 'react-redux'
import { resetPageErrors } from '../actions'
import NotFound from './404'

const mapDispatchToProps = {
  resetPageErrors,
}

export default connect(
  () => ({}),
  mapDispatchToProps,
)(NotFound)
