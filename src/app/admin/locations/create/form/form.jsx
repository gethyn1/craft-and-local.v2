// @flow

import React from 'react'
import { Input } from 'common/components/input'
import { Button } from 'common/components/button'

type Props = {
  producerId: String,
  onSubmit: Function,
}

type State = {
  alias: string,
}

export class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      alias: '',
    }
  }

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    this.props.onSubmit({ ...this.state, producer: this.props.producerId })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="u-margin-bottom">
          <Input id="alias" label="Alias" name="alias" onChange={this.handleChange} value={this.state.alias} />
        </div>
        <Button type="submit">Create location</Button>
      </form>
    )
  }
}
