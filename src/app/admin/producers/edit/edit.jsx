// @flow

import React from 'react'
import Container from 'common/components/container'
import { TextListInput } from './text-list-input'

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
}

type State = {
  title: string,
  user_id: string,
  address: string,
  lng: number,
  lat: number,
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
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.producer !== nextProps.producer) {
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

  handleSubmit = (event: Event) => {
    event.preventDefault()
    this.props.onSubmit(this.props.user_id, this.state)
  }

  render() {
    const { hasUpdated, isFetching, hasErrored } = this.props

    return (
      <Container>
        <h2>Edit Producer: {this.props.user_id}</h2>
        {hasUpdated && <p>Producer succesfully updated</p>}
        {isFetching && <p>Updating producer ...</p>}
        {hasErrored && <p>There was an error updating the producer. Please try again</p>}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">Title</label><br />
            <input id="title" type="text" name="title" onChange={this.handleChange} value={this.state.title} />
          </div>
          <div>
            <label htmlFor="user_id">User ID</label><br />
            <input id="user_id" type="text" name="user_id" onChange={this.handleChange} value={this.state.user_id} />
          </div>
          <div>
            <label htmlFor="address_lookup">Address</label><br />
            <TextListInput
              value={this.state.address}
              options={this.props.geoCodingOptions}
              onChange={this.handleGeoCoding}
              onOptionSelect={this.handleAddressSelect}
              name="address_lookup"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </Container>
    )
  }
}
