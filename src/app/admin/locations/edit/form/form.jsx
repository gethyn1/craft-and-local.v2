// @flow

import React from 'react'
import { path } from 'ramda'
import { Input } from 'common/components/input'
import { Button } from 'common/components/button'
import { AddressLookup } from 'common/components/address-lookup'
import { Categories } from 'common/components/categories'

type Props = {
  location: Object,
  onSubmit: Function,
  categories: ?Array<Object>,
}

type State = {
  alias: string,
  id: string,
  address: string,
  lng: number,
  lat: number,
  categories: ?Array<String>,
  instagram_handle: ?string,
  twitter_handle: ?string,
  contact_email: ?string,
  contact_telephone: ?string,
  website: ?string,
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
      categories: [],
      instagram_handle: '',
      twitter_handle: '',
      website: '',
      contact_email: '',
      contact_telephone: '',
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
      categories: path(['categories'], location) ? location.categories.map(category => category._id) : null,
      instagram_handle: location.instagram_handle || '',
      twitter_handle: location.twitter_handle || '',
      website: location.website || '',
      contact_email: location.contact_email || '',
      contact_telephone: location.contact_telephone || '',
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

  handleCategoryChange = (selected: Array<String>) => {
    this.setState({
      categories: selected,
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
        <div className="u-margin-bottom">
          <Categories categories={this.props.categories} selected={this.state.categories} onCategorySelect={this.handleCategoryChange} />
        </div>
        <div className="u-margin-bottom">
          <Input id="instagram_handle" label="Instagram" name="instagram_handle" onChange={this.handleChange} value={this.state.instagram_handle} />
        </div>
        <div className="u-margin-bottom">
          <Input id="twitter_handle" label="Twitter" name="twitter_handle" onChange={this.handleChange} value={this.state.twitter_handle} />
        </div>
        <div className="u-margin-bottom">
          <Input id="website" label="Website" name="website" onChange={this.handleChange} value={this.state.website} />
        </div>
        <div className="u-margin-bottom">
          <Input id="contact_email" label="Contact email address" name="contact_email" onChange={this.handleChange} value={this.state.contact_email} />
        </div>
        <div className="u-margin-bottom">
          <Input id="contact_telephone" label="Contact telephone" name="contact_telephone" onChange={this.handleChange} value={this.state.contact_telephone} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    )
  }
}
