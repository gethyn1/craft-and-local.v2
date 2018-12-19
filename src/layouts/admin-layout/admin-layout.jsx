// @flow

import * as React from 'react'
import { PRODUCERS_ADMIN_ROUTE, CREATE_PRODUCERS_PATH } from 'common/constants/paths'
import TopBar from '../../components/top-bar'
import Footer from '../../components/footer'

type Props = {
  children: React.Node,
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
]

export const AdminLayout = ({ children }: Props) => (
  <React.Fragment>
    <TopBar navigationItems={navigationItems} />
    {children}
    <Footer />
  </React.Fragment>
)
