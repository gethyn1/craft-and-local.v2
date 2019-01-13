// @flow

import React from 'react'
import { Notification } from 'components/notification'
import { Input } from 'components/input'
import { Button } from 'components/button'

type Props = {
  onSubmit: Function,
  dismissNotification: Function,
  isCreating: boolean,
  hasErrored: boolean,
  hasCreated: boolean,
}

type State = {
  title: string,
  slug: string,
}

class AddCategory extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      title: '',
      slug: '',
    }
  }

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.title, this.state.slug)
  }

  render() {
    return (
      <React.Fragment>
        <h2>Create a new category</h2>
        {this.props.hasCreated && <p>Category succesfully created</p>}
        {this.props.isCreating && <Notification message="Creating category ..." />}
        {this.props.hasErrored && <Notification onDismiss={this.props.dismissNotification} status="error" message="There was an error creating the category. Please try again" />}
        <form onSubmit={this.handleSubmit}>
          <div className="u-margin-bottom">
            <Input id="title" label="Title" name="title" onChange={this.handleChange} value={this.state.title} />
          </div>
          <div className="u-margin-bottom">
            <Input id="slug" label="Slug" name="slug" onChange={this.handleChange} value={this.state.slug} />
          </div>
          <Button disabled={this.props.isCreating} type="submit">+ Add new category</Button>
        </form>
      </React.Fragment>
    )
  }
}

export { AddCategory }
