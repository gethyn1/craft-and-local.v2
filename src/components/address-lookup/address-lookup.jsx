// @flow

import React from 'react'
import { TextListInput } from './text-list-input'

type Props = {
  address: string,
  geoCodingOptions: ?Array<Object>,
  geoCodingLookup: Function,
  onSelect: Function,
  resetGeoCodingOptions: Function,
}

const handleAddressSelect = (fn: Function, resetGeoCodingOptions: Function) => (data: Object) => {
  const lngLat = data.value.split(',')

  fn({
    address: data.option,
    lng: parseFloat(lngLat[0]),
    lat: parseFloat(lngLat[1]),
  })

  resetGeoCodingOptions()
}

const AddressLookup = ({
  address,
  geoCodingOptions,
  geoCodingLookup,
  onSelect,
  resetGeoCodingOptions,
}: Props) => (
  <TextListInput
    label="Address"
    value={address}
    options={geoCodingOptions}
    onChange={geoCodingLookup}
    onOptionSelect={handleAddressSelect(onSelect, resetGeoCodingOptions)}
    name="address_lookup"
  />
)

export { AddressLookup }
