// @flow

import * as React from 'react'
import { CONTACT_PATH, PRODUCERS_PATH } from 'common/constants/paths'
import TopBar from '../../components/top-bar'
import Footer from '../../components/footer'

type Props = {
  children: React.Node,
  getUserLocation: Function,
  getCategories: Function,
}

const navigationItems = [
  {
    key: 'producers',
    path: PRODUCERS_PATH,
    title: 'Producers',
  },
  {
    key: 'contact',
    path: CONTACT_PATH,
    title: 'Contact',
  },
]

export class DefaultLayout extends React.Component<Props> {
  componentDidMount() {
    this.props.getUserLocation()
    this.props.getCategories()
  }

  render() {
    return (
      <React.Fragment>
        <TopBar navigationItems={navigationItems} />
        {this.props.children}
        <Footer />
      </React.Fragment>
    )
  }
}
