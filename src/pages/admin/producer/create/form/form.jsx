// @flow

import React from 'react'
import { Input } from 'components/input'
import { Button } from 'components/button'

type Props = {
  onSubmit: Function,
  disabled: boolean,
}

type State = {
  title: string,
  userId: string,
}

export class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      title: '',
      userId: '',
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
          <Input id="userId" label="User ID" name="userId" onChange={this.handleChange} value={this.state.userId} />
        </div>
        <Button type="submit" disabled={this.props.disabled}>Submit</Button>
      </form>
    )
  }
}
