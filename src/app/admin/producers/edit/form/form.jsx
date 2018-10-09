// @flow

import React from 'react'
import { path } from 'ramda'
import { Button } from 'common/components/button'
import { Input } from 'common/components/input'
import { AddressLookup } from 'common/components/address-lookup'
import { Categories } from 'common/components/categories'

type Props = {
  userId: string,
  producer: Object,
  onSubmit: Function,
  categories: ?Array<Object>,
}

type State = {
  title: string,
  user_id: string,
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
      title: '',
      user_id: '',
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
    this.mapProducerToState(this.props.producer)
  }

  componentDidUpdate(prevProps: Props) {
    if (path(['producer', '_id'], this.props) !== path(['producer', '_id'], prevProps)) {
      this.mapProducerToState(this.props.producer)
    }
  }

  mapProducerToState(producer: Object) {
    if (!producer) {
      return null
    }

    return this.setState({
      title: producer.title,
      user_id: producer.user_id,
      address: producer.address,
      lng: producer.location.coordinates[0],
      lat: producer.location.coordinates[1],
      categories: producer.categories.map(category => category._id),
      instagram_handle: producer.instagram_handle,
      twitter_handle: producer.twitter_handle,
      website: producer.website,
      contact_email: producer.contact_email,
      contact_telephone: producer.contact_telephone,
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
    this.props.onSubmit(this.props.userId, this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="u-margin-bottom">
          <Input id="title" label="Title" name="title" onChange={this.handleChange} value={this.state.title} />
        </div>
        <div className="u-margin-bottom">
          <Input id="user_id" label="User ID" name="user_id" onChange={this.handleChange} value={this.state.user_id} />
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
