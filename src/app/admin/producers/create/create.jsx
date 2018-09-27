// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'common/components/container'
import { EDIT_PRODUCERS_PATH } from 'common/constants/paths'

type State = {
  title: string,
  user_id: string,
}

type Props = {
  isFetching: boolean,
  hasErrored: boolean,
  hasUpdated: boolean,
  onSubmit: Function,
}

export class Create extends React.Component<Props, State> {
  state = {
    title: '',
    user_id: '',
  }

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const { hasUpdated, isFetching, hasErrored } = this.props

    return (
      <Container>
        <h2>Create a producer</h2>
        {hasUpdated && <p>Producer succesfully created <Link to={`${EDIT_PRODUCERS_PATH}/${this.state.user_id}`}>Edit producer</Link></p>}
        {isFetching && <p>Creating producer ...</p>}
        {hasErrored && <p>There was an error creating the producer. Please try again</p>}
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
