import React from 'react'
import { mount } from 'enzyme'
import { TextListInput } from '../text-list-input'

const mockOptions = [
  { id: '1', option: 'option 1', value: 'value 1' },
  { id: '2', option: 'option 2', value: 'value 2' },
]

describe('<TextListInput />', () => {
  let props
  let mountedTextListInput

  const textListInput = () => {
    if (!mountedTextListInput) {
      mountedTextListInput = mount(<TextListInput {...props} />)
    }

    return mountedTextListInput
  }

  beforeEach(() => {
    props = {
      value: undefined,
      name: 'test',
      onChange: jest.fn(),
      onOptionSelect: jest.fn(),
      options: undefined,
    }

    mountedTextListInput = undefined
  })

  it('only displays a single input', () => {
    const input = textListInput().find('input')
    expect(input.length).toBe(1)
  })

  it('calls `onChange` on user input', () => {
    const input = textListInput().find('input').first()
    input.simulate('change', { target: { value: 'B' } })
    expect(props.onChange.mock.calls.length).toBe(1)
  })

  it('displays the correct number of suggestions', () => {
    props.options = mockOptions
    const options = textListInput().find('li')
    expect(options.length).toBe(2)
  })

  it('calls `onOptionSelect` when an option is selected', () => {
    props.options = mockOptions
    const option = textListInput().find('li').first()
    option.simulate('click')
    expect(props.onOptionSelect.mock.calls.length).toBe(1)
  })

  it('passes selected option value with `onOptionSelect`', () => {
    props.options = mockOptions
    const option = textListInput().find('li').first()
    option.simulate('click')
    expect(props.onOptionSelect.mock.calls[0][0]).toBe(mockOptions[0])
  })

  // it('sets selected option as input value when selected', () => {
  //   props.options = mockOptions
  //   const component = textListInput()
  //   const option = component.find('li').first()
  //   const input = component.find('input').first()
  //   option.simulate('click')
  //   expect(input.props().value).toBe('option 1')
  // })

  // it('should set input value if props.value is defined', () => {
  //   props.value = 'test value'
  //   const input = textListInput().find('input').first()
  //   expect(input.props().value).toBe('test value')
  // })

  // it('should not set input value after user has interacted with component', () => {
  //   props.value = 'test value'
  //   const input = textListInput().find('input').first()
  //   input.simulate('change', { target: { value: '' } })
  //   expect(input.props().value).toBe('')
  // })
})
