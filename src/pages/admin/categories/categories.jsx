// @flow

import React from 'react'
import Container from 'components/container'
import List from 'components/list'
import { AdminLayout } from '../../../layouts/admin-layout'
import { AddCategory } from './add-category'

type Props = {
  categories: Array<Object>,
}

export const Categories = ({ categories }: Props) => (
  <AdminLayout>
    <Container>
      <h2>Edit Categories</h2>
      <List bare className="u-margin-bottom-lg">
        {categories.map(category => <li key={category._id}>{category.title}</li>)}
      </List>
      <AddCategory />
    </Container>
  </AdminLayout>
)
