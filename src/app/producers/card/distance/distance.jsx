// @flow
/* global google */

import React from 'react'
import scriptLoader from 'react-async-script-loader'
import { GOOGLE_MAPS_URL } from '../../../../config'

// Convert metres to miles and round to 2 decimal places
const toMiles = (metres) => {
  const miles = metres * 0.000621371192
  return Math.round((miles + 0.00001) * 100) / 100
}

type Props = {
  from: Object,
  to: Object,
  isScriptLoaded: boolean,
  isScriptLoadSucceed: boolean,
}

// flow-disable-next-line
@scriptLoader([GOOGLE_MAPS_URL])
class Distance extends React.Component {
  static defaultProps: Object

  constructor(props: Props) {
    super(props)

    this.distance = 0
  }

  componentWillReceiveProps({
    from,
    to,
    isScriptLoaded,
    isScriptLoadSucceed,
  }: Props) {
    if (isScriptLoaded && isScriptLoadSucceed) {
      // Only render distance if latLng is defined. Default 0 is falsey.
      if (from.lat && from.lng) {
        this.getDistance(from, to)
      }
    }
  }

  getDistance(from: number, to: number) {
    // flow-disable-next-line
    const fromLatLng = new google.maps.LatLng(from)
    const toLatLng = new google.maps.LatLng(to)
    const distanceInMetres = google.maps.geometry.spherical.computeDistanceBetween(
      fromLatLng,
      toLatLng,
    )

    this.distance = toMiles(distanceInMetres)
  }

  getDistance: Function
  distance: number
  props: Props

  render() {
    return (
      <span>{this.distance} miles</span>
    )
  }
}

export default Distance
