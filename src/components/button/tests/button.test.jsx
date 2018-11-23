import React from 'react'
import { shallow } from 'enzyme'
import { Button, generateClassList } from '../button'
import styles from '../button.scss'

describe('generateClassList()', () => {
  it('should return a string when passed an array', () => {
    expect(generateClassList(['a', 'b', 'c'])).toEqual('a b c')
  })

  it('should exclude falsey values from the returned string', () => {
    expect(generateClassList(['a', null, 'b', false, 'c', undefined])).toEqual('a b c')
  })
})

describe('<Button />', () => {
  let props
  let mountedComponent

  const children = (<span>Test</span>)

  const renderedComponent = () => {
    if (!mountedComponent) {
      mountedComponent = shallow(<Button {...props}>{children}</Button>)
    }

    return mountedComponent
  }

  beforeEach(() => {
    props = {
      href: undefined,
      className: undefined,
      level: undefined,
      onClick: undefined,
      type: undefined,
    }

    mountedComponent = undefined
  })

  it('should render an <a> tag if href is specified', () => {
    props.href = 'https://google.com'
    const rendered = renderedComponent()
    expect(rendered.find('a').length).toBe(1)
  })

  it('should render a <button> tag if no href is specified', () => {
    const rendered = renderedComponent()
    expect(rendered.find('button').length).toBe(1)
  })

  it('should have children', () => {
    const rendered = renderedComponent()
    expect(rendered.contains(children)).toEqual(true)
  })

  it('should update <button> type attribute if type is specified', () => {
    props.type = 'submit'
    const rendered = renderedComponent()
    expect(rendered.find('button').prop('type')).toEqual('submit')
  })

  it('should handle click events', () => {
    props.onClick = jest.fn()
    const rendered = renderedComponent()
    rendered.simulate('click')
    expect(props.onClick.mock.calls.length).toBe(1)
  })

  it('should have a className attribute', () => {
    props.className = 'test'
    const rendered = renderedComponent()
    expect(rendered.find('button').hasClass('test')).toBe(true)
  })

  it('should add a button level class if prop is specified', () => {
    props.level = 'primary'
    const rendered = renderedComponent()
    // eslint-disable-next-line dot-notation
    expect(rendered.hasClass(styles['primary'])).toBe(true)
  })

  it('should add a target attribute if prop is specified', () => {
    props.href = 'https://google.com'
    props.target = '_blank'
    const rendered = renderedComponent()
    expect(rendered.find('a').prop('target')).toEqual('_blank')
  })

  it('should add `styles.block` if block prop is defined', () => {
    props.block = true
    const rendered = renderedComponent()
    expect(rendered.find('button').hasClass(styles.block)).toBe(true)
  })
})
