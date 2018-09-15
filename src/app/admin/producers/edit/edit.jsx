// @flow

import React from 'react'
import Container from 'common/components/container'

type Props = {
  user_id: string,
  producer: Object,
  onSubmit: Function,
  isFetching: boolean,
  hasErrored: boolean,
  hasUpdated: boolean,
}

type State = {
  title: ?string,
  user_id: ?string,
}

export class Edit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      title: '',
      user_id: '',
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.producer) {
      this.mapProducerToState(nextProps.producer)
    }
  }

  mapProducerToState(producer: Object) {
    this.setState({
      title: producer.title,
      user_id: producer.user_id,
    })
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
          <button type="submit">Submit</button>
        </form>
      </Container>
    )
  }
}
