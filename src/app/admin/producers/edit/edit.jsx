// @flow

import React from 'react'
import { path } from 'ramda'
import Container from 'common/components/container'
import { TextListInput } from './text-list-input'
import { Category } from './category'

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
}

type State = {
  title: string,
  user_id: string,
  address: string,
  lng: number,
  lat: number,
  categories: ?Array<string>,
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
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (path(['props', 'producer', '_id'], this) !== path(['producer', '_id'], nextProps)) {
      this.mapProducerToState(nextProps.producer)
    }
  }

  mapProducerToState(producer: Object) {
    this.setState({
      title: producer.title,
      user_id: producer.user_id,
      address: producer.address,
      lng: producer.location.coordinates[0],
      lat: producer.location.coordinates[1],
      categories: producer.categories.map(category => category._id),
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
          <button type="submit">Submit</button>
        </form>
      </Container>
    )
  }
}
