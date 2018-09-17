// @flow

import React from 'react'

type Option = {
  id: string,
  value: string,
  option: string,
}

type Props = {
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

    this.handleChange = this.handleChange.bind(this)
    this.handleOptionSelect = this.handleOptionSelect.bind(this)
  }

  componentWillReceiveProps(nextProps: Object) {
    if (!this.state.value && !this.state.dirty) {
      this.setState({
        dirty: false,
        value: nextProps.value,
      })
    }
  }

  handleChange(event: SyntheticEvent<HTMLInputElement>) {
    this.props.onChange(event.currentTarget.value)

    this.setState({
      dirty: true,
      value: event.currentTarget.value,
    })
  }

  handleOptionSelect(option: Option) {
    this.props.onOptionSelect(option)

    this.setState({
      value: option.option,
    })
  }

  renderDataList() {
    const { options } = this.props

    if (options) {
      return (
        <ul>
          {options.map(option => (
            <li
              key={option.id}
              role="presentation"
              onClick={() => { this.handleOptionSelect(option) }}
            >
              {option.option}
            </li>
          ))}
        </ul>
      )
    }

    return null
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleChange}
          name={this.props.name}
          value={this.state.value}
          autoComplete="off"
        />
        {this.renderDataList()}
      </div>
    )
  }
}

TextListInput.defaultProps = {
  onOptionSelect: () => {},
}

export { TextListInput }
