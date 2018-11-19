// @flow

import { connect } from 'react-redux'
import { geocoding } from 'src/domain'
import { AddressLookup } from './address-lookup'

const formatGeoCodingOption = (option: Object) => ({
  id: option.id,
  option: option.address,
  value: `${option.lng},${option.lat}`,
})

const mapStateToProps = (state: Object) => ({
  geoCodingOptions: state.domain.geocoding.data.addressLookupOptions.map(formatGeoCodingOption),
})

const mapDispatchToProps = {
  geoCodingLookup: geocoding.actions.geocodingGetLatLngFromAddress,
  resetGeoCodingOptions: geocoding.actions.geocodingAddressLookupReset,
}

export const container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressLookup)
