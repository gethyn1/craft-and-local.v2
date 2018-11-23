// @flow

import * as React from 'react'
import TopBar from '../../components/top-bar'
import Footer from '../../components/footer'

type Props = {
  children: React.Node,
  getUserLocation: Function,
  getCategories: Function,
}

export class DefaultLayout extends React.Component<Props> {
  componentDidMount() {
    this.props.getUserLocation()
    this.props.getCategories()
  }

  render() {
    return (
      <React.Fragment>
        <TopBar />
        {this.props.children}
        <Footer />
      </React.Fragment>
    )
  }
}
