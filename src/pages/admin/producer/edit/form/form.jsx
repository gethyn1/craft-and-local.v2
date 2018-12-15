// @flow

import React from 'react'
import { path } from 'ramda'
import { Button } from 'components/button'
import { Input } from 'components/input'
import { Categories } from 'components/categories'

type Props = {
  userId: string,
  producer: Object,
  onSubmit: Function,
  categories: ?Array<Object>,
  disabled: boolean,
}

type State = {
  title: string,
  userId: string,
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
      userId: '',
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
      userId: producer.userId,
      categories: producer.categories.map(category => category._id),
      instagram_handle: producer.instagram_handle,
      twitter_handle: producer.twitter_handle,
      website: producer.website,
      contact_email: producer.contact_email,
      contact_telephone: producer.contact_telephone,
    })
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
          <Input id="userId" label="User ID" name="userId" onChange={this.handleChange} value={this.state.userId} />
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
        <Button disabled={this.props.disabled} type="submit">Submit</Button>
      </form>
    )
  }
}
