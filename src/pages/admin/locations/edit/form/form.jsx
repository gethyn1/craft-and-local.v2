// @flow

import React from 'react'
import { path } from 'ramda'
import { Input } from 'components/input'
import { Button } from 'components/button'
import { AddressLookup } from 'components/address-lookup'

type Props = {
  location: Object,
  onSubmit: Function,
}

type State = {
  alias: string,
  id: string,
  address: string,
  lng: number,
  lat: number,
}

export class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      alias: '',
      id: '',
      address: '',
      lng: 0,
      lat: 0,
    }
  }

  componentDidMount() {
    this.mapLocationToState(this.props.location)
  }

  componentDidUpdate(prevProps: Props) {
    if (path(['props', 'location', '_id'], this) !== path(['location', '_id'], prevProps)) {
      this.mapLocationToState(this.props.location)
    }
  }

  mapLocationToState(location: Object) {
    if (!location) {
      return null
    }

    return this.setState({
      alias: location.alias || '',
      id: location._id || '',
      address: location.address || '',
      lng: location.location.coordinates[0] || 0,
      lat: location.location.coordinates[1] || 0,
    })
  }

  handleAddressSelect = (address: Object) => {
    this.setState(address)
  }

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    this.props.onSubmit(this.props.location._id, this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="u-margin-bottom">
          <Input id="title" label="Alias" name="alias" onChange={this.handleChange} value={this.state.alias} />
        </div>
        <div className="u-margin-bottom">
          <AddressLookup address={this.state.address} onSelect={this.handleAddressSelect} />
        </div>
        <div className="u-margin-bottom-sm">
          <Input id="lng" label="Longitude" name="lng" onChange={this.handleChange} value={this.state.lng} />
        </div>
        <div className="u-margin-bottom">
          <Input id="lat" label="Latitude" name="lat" onChange={this.handleChange} value={this.state.lat} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    )
  }
}
