// @flow
/* global google */

import React from 'react'
import scriptLoader from 'react-async-script-loader'

import { GOOGLE_MAPS_URL } from '../../config'

type Props = {
  latitude?: number,
  longitude?: number,
  zoom?: number,
  markers?: Array<Object>,
  addCenterMarker?: boolean,
  isScriptLoaded: boolean,
  isScriptLoadSucceed: boolean,
}

// flow-disable-next-line
@scriptLoader([GOOGLE_MAPS_URL])
class GoogleMap extends React.Component<Props> {
  static defaultProps: Object

  constructor(props: Props) {
    super(props)

    this.map = null
    this.marker = null
    this.markersArr = []
    this.mapContainer = null
  }

  componentWillReceiveProps(nextProps: Props) {
    const {
      addCenterMarker,
      latitude,
      longitude,
      markers,
      zoom,
      isScriptLoaded,
      isScriptLoadSucceed,
    } = nextProps

    if (isScriptLoaded && isScriptLoadSucceed) {
      if (!this.map) {
        // flow-disable-next-line
        this.map = new google.maps.Map(this.mapContainer, {
          zoom,
          scrollwheel: false,
        })
      }

      this.setMapCenter(latitude, longitude, addCenterMarker)
      this.addMarkers(markers)
    }
  }

  setMapCenter: Function

  setMapCenter(lat: number, lng: number, addCenterMarker: boolean) {
    if (lat && lng) {
      const pos = { lat, lng }

      this.map.setCenter(pos)

      // Add central marker for current position
      if (addCenterMarker) {
        this.addMarker(pos, this.map, null, false)
      }
    }
  }

  map: any
  marker: any
  markersArr: Array<Object>
  mapContainer: any
  addMarkers: Function

  addMarker(pos: Object, map: HTMLElement, title: ?string, push: boolean = true) {
    let infowindow

    // flow-disable-next-line
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(pos),
    })

    if (title) {
      infowindow = new google.maps.InfoWindow({
        content: `<p>${title}</p>`,
      })

      marker.title = title
      marker.addListener('click', () => infowindow.open(map, marker))
    }

    if (push) {
      this.markersArr.push(marker)
    }

    return marker.setMap(map)
  }

  addMarkers(markers: Array<Object>) {
    // Clear previous markers
    this.markersArr.forEach((marker) => {
      marker.setMap(null)
    })

    this.markersArr = []

    // Add new markers
    markers.forEach((item) => {
      this.addMarker({
        lat: item.lat,
        lng: item.lng,
      }, this.map, item.title)
    })
  }

  render() {
    // Ensure map fills 100% of parent's width and height.
    const mapStyles = {
      height: '100%',
      width: '100%',
    }

    return (
      <div>
        <div ref={(c) => { this.mapContainer = c }} style={mapStyles} />
        { !this.map && <div>Loading map...</div> }
      </div>
    )
  }
}

GoogleMap.defaultProps = {
  latitude: 51.534915,
  longitude: -0.129111,
  zoom: 15,
  markers: [],
  addCenterMarker: true,
  onScriptLoaded: () => {},
}

export default GoogleMap
