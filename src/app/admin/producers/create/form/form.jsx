// @flow

import React from 'react'
import { Input } from 'common/components/input'
import { Button } from 'common/components/button'

type Props = {
  onSubmit: Function,
}

type State = {
  title: string,
  user_id: string,
}

export class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      title: '',
      user_id: '',
    }
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
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="u-margin-bottom">
          <Input id="title" label="Title" name="title" onChange={this.handleChange} value={this.state.title} />
        </div>
        <div className="u-margin-bottom">
          <Input id="user_id" label="User ID" name="user_id" onChange={this.handleChange} value={this.state.user_id} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    )
  }
}
