// @flow

import * as React from 'react'
import { PRODUCERS_ADMIN_ROUTE, CREATE_PRODUCERS_PATH, EDIT_CATEGORIES_ROUTE } from 'common/constants/paths'
import TopBar from '../../components/top-bar'
import Footer from '../../components/footer'

type Props = {
  children: React.Node,
  getCategories: Function,
}

const navigationItems = [
  {
    key: 'producers',
    path: PRODUCERS_ADMIN_ROUTE,
    title: 'Producers',
  },
  {
    key: 'create-producer',
    path: CREATE_PRODUCERS_PATH,
    title: 'New producer',
  },
  {
    key: 'edit-categories',
    path: EDIT_CATEGORIES_ROUTE,
    title: 'Categories',
  },
]

export class AdminLayout extends React.Component<Props> {
  componentDidMount() {
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
