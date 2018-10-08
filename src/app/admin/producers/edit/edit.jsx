// @flow

import React from 'react'
import { path } from 'ramda'
import Container from 'common/components/container'
import { TextListInput } from './text-list-input'
import { Category } from './category'
import { Avatar } from './avatar'
import { Locations } from './locations'

type Props = {
  user_id: string,
  producer: Object,
  onSubmit: Function,
  isFetching: boolean,
  hasErrored: boolean,
  hasUpdated: boolean,
  geoCodingOptions: ?Array<Object>,
  geoCodingLookup: Function,
  onGeoCodingSelect: Function,
  categories: ?Array<Object>,
  locations: ?Array<Object>,
  locationsIsLoading: boolean,
  locationsHasErrored: boolean,
}

type State = {
  title: string,
  user_id: string,
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

export class Edit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      title: '',
      user_id: '',
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
    this.props.onSubmit(this.props.user_id, this.state)
  }

  categoryInState = (id: string) => {
    if (this.state.categories) {
      return this.state.categories.includes(id)
    }

    return false
  }

  render() {
    const { hasUpdated, isFetching, hasErrored, categories } = this.props

    return (
      <Container>
        <h2>Producer locations</h2>
        <Locations
          isLoading={this.props.locationsIsLoading}
          hasErrored={this.props.locationsHasErrored}
          locations={this.props.locations}
          producerId={this.props.user_id}
        />
        <h2>Edit avatar</h2>
        <Avatar />
        <h2>Edit Producer: {this.props.user_id}</h2>
        {hasUpdated && <p>Producer succesfully updated</p>}
        {isFetching && <p>Updating producer ...</p>}
        {hasErrored && <p>There was an error updating the producer. Please try again</p>}
        <form onSubmit={this.handleSubmit}>
          <div className="u-margin-bottom">
            <label htmlFor="title">Title</label><br />
            <input id="title" type="text" name="title" onChange={this.handleChange} value={this.state.title} />
          </div>
          <div className="u-margin-bottom">
            <label htmlFor="user_id">User ID</label><br />
            <input id="user_id" type="text" name="user_id" onChange={this.handleChange} value={this.state.user_id} />
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
      </Container>
    )
  }
}
