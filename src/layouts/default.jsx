// @flow

import * as React from 'react'
import TopBar from '../components/top-bar'
import Footer from '../components/footer'

type Props = {
  children: React.Node,
}

export const Default = ({ children }: Props) => (
  <React.Fragment>
    <TopBar />
    {children}
    <Footer />
  </React.Fragment>
)
