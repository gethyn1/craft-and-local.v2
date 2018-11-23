// @flow

import React from 'react'
import { Input } from 'components/input'
import { Button } from 'components/button'

type Props = {
  onSubmit: Function,
}

type State = {
  email: string,
  password: string,
}

export class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.email, this.state.password)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="u-margin-bottom">
          <Input id="email" label="Email address" name="email" onChange={this.handleChange} value={this.state.email} />
        </div>
        <div className="u-margin-bottom">
          <Input type="password" id="password" label="Password" name="password" onChange={this.handleChange} value={this.state.password} />
        </div>
        <Button type="submit">Login</Button>
      </form>
    )
  }
}
