// @flow

import React from 'react'

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
          <label htmlFor="title">Alias</label><br />
          <input id="title" type="text" name="alias" onChange={this.handleChange} value={this.state.alias} />
        </div>
        <button type="submit">Create location</button>
      </form>
    )
  }
}
