// @flow

import React from 'react'
import Container from 'components/container'
import List from 'components/list'
// import { Notification } from 'components/notification'
import { AdminLayout } from '../../../layouts/admin-layout'

type Props = {
  categories: Array<Object>,
}

export const Categories = ({ categories }: Props) => (
  <AdminLayout>
    <Container>
      <h2>Edit Categories</h2>
      <List bare>
        {categories.map(category => <li key={category._id}>{category.title}</li>)}
      </List>
    </Container>
  </AdminLayout>
)
