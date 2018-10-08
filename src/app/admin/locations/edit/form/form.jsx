// @flow

import React from 'react'
import { path } from 'ramda'
import { TextListInput } from './text-list-input'
import { Category } from './category'

type Props = {
  location: Object,
  onSubmit: Function,
  geoCodingOptions: ?Array<Object>,
  geoCodingLookup: Function,
  onGeoCodingSelect: Function,
  categories: ?Array<Object>,
}

type State = {
  alias: string,
  id: string,
  address: string,
  lng: number,
  lat: number,
  categories: ?Array<string>,
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
      categories: null,
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

  handleGeoCoding = (address: string) => {
    this.props.geoCodingLookup(address)
  }

  handleAddressSelect = (data: Object) => {
    const lngLat = data.value.split(',')

    this.setState({
      address: data.option,
      lng: parseFloat(lngLat[0]),
      lat: parseFloat(lngLat[1]),
    })

    this.props.onGeoCodingSelect()
  }

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  handleCategoryChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { categories } = this.state
    let newCategories = categories || []

    if (event.currentTarget.checked) {
      newCategories.push(event.currentTarget.value)
    } else if (categories) {
      newCategories = categories.filter(cat => cat !== event.currentTarget.value)
    }

    this.setState({
      categories: newCategories.length ? newCategories : null,
    })
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    this.props.onSubmit(this.props.location._id, this.state)
  }

  categoryInState = (id: string) => {
    if (this.state.categories) {
      return this.state.categories.includes(id)
    }

    return false
  }

  render() {
    const { categories } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="u-margin-bottom">
          <label htmlFor="title">Alias</label><br />
          <input id="title" type="text" name="alias" onChange={this.handleChange} value={this.state.alias} />
        </div>
        <div className="u-margin-bottom">
          <label htmlFor="id">Location ID</label><br />
          <input id="id" type="text" name="id" value={this.state.id} />
        </div>
        <div className="u-margin-bottom">
          <label htmlFor="address_lookup">Address</label><br />
          <TextListInput
            value={this.state.address}
            options={this.props.geoCodingOptions}
            onChange={this.handleGeoCoding}
            onOptionSelect={this.handleAddressSelect}
            name="address_lookup"
          />
        </div>
        <div className="u-margin-bottom-sm">
          <label htmlFor="lng">Longitude</label><br />
          <input onChange={this.handleChange} type="text" name="lng" value={this.state.lng} />
        </div>
        <div className="u-margin-bottom">
          <label htmlFor="lat">Latitude</label><br />
          <input onChange={this.handleChange} type="text" name="lat" value={this.state.lat} />
        </div>
        <div className="u-margin-bottom">
          <p>Categories:</p>
          {categories && categories.map((category: Object) =>
            <Category key={category._id} category={category} checked={this.categoryInState} onChange={this.handleCategoryChange} />)}
        </div>
        <div className="u-margin-bottom">
          <label htmlFor="instagram_handle">Instagram</label><br />
          <input onChange={this.handleChange} type="text" name="instagram_handle" value={this.state.instagram_handle} />
        </div>
        <div className="u-margin-bottom">
          <label htmlFor="twitter_handle">Twitter</label><br />
          <input onChange={this.handleChange} type="text" name="twitter_handle" value={this.state.twitter_handle} />
        </div>
        <div className="u-margin-bottom">
          <label htmlFor="website">Website</label><br />
          <input onChange={this.handleChange} type="text" name="website" value={this.state.website} />
        </div>
        <div className="u-margin-bottom">
          <label htmlFor="contact_email">Contact email address</label><br />
          <input onChange={this.handleChange} type="text" name="contact_email" value={this.state.contact_email} />
        </div>
        <div className="u-margin-bottom">
          <label htmlFor="contact_telephone">Contact telephone</label><br />
          <input onChange={this.handleChange} type="text" name="contact_telephone" value={this.state.contact_telephone} />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
