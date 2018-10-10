// @flow

import React from 'react'
import { Input } from 'common/components/input'
import { DataList } from './data-list'

type Option = {
  id: string,
  value: string,
  option: string,
}

type Props = {
  label: String,
  options: ?Array<Option>,
  name: string,
  onChange: Function,
  onOptionSelect: (value: Object) => void,
  value: string,
}

type State = {
  dirty: boolean,
  value: string,
}

class TextListInput extends React.Component<Props, State> {
  static defaultProps: Object

  constructor(props: Props) {
    super(props)

    this.state = {
      dirty: false,
      value: this.props.value || '',
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    if (!this.state.value && !this.state.dirty) {
      this.setState({
        dirty: false,
        value: nextProps.value,
      })
    }
  }

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    this.props.onChange(event.currentTarget.value)

    this.setState({
      dirty: true,
      value: event.currentTarget.value,
    })
  }

  handleOptionSelect = (option: Option) => {
    this.props.onOptionSelect(option)

    this.setState({
      value: option.option,
    })
  }

  render() {
    return (
      <React.Fragment>
        <Input
          autoComplete="off"
          id={this.props.name}
          label={this.props.label}
          name={this.props.name}
          onChange={this.handleChange}
          value={this.state.value}
        />
        {this.props.options && <DataList items={this.props.options} onSelect={this.handleOptionSelect} />}
      </React.Fragment>
    )
  }
}

TextListInput.defaultProps = {
  onOptionSelect: () => {},
}

export { TextListInput }
