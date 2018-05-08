import React from 'react'
import { mount } from 'enzyme'
import Avatar from '../avatar'
import styles from '../avatar.scss'

describe('<Avatar />', () => {
  let props
  let mountedComponent

  const renderedComponent = () => {
    if (!mountedComponent) {
      mountedComponent = mount(<Avatar {...props} />)
    }

    return mountedComponent
  }

  beforeEach(() => {
    props = {
      className: undefined,
      alt: 'alternative text',
      src: 'test.jpg',
      size: undefined,
    }

    mountedComponent = undefined
  })

  it('should display a single image', () => {
    const image = renderedComponent().find('img')
    expect(image.length).toBe(1)
  })

  it('should use props.src as the image src', () => {
    const image = renderedComponent().find('img')
    expect(image.prop('src')).toBe('test.jpg')
  })

  it('should use props.alt as the image alt tag', () => {
    const image = renderedComponent().find('img')
    expect(image.prop('alt')).toBe('alternative text')
  })

  it('should use add a class of props.className if defined', () => {
    props.className = 'test'
    const avatar = renderedComponent()
    expect(avatar.hasClass('test')).toBe(true)
  })

  it('should add props.size as a class', () => {
    props.size = 'small'
    const avatar = renderedComponent()
    expect(avatar.hasClass(styles.small)).toBe(true)
  })
})
