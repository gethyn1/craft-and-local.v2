// @flow

import React from 'react'

type Category = {
  title: string,
  _id: string,
}

type Props = {
  categories: Array<Category>,
}

const Categories : Function = ({ categories }: Props) =>
  categories.map((category, i) => (
    <span key={category._id}>
      {category.title}
      {i + 1 === categories.length ? null : ', '}
    </span>
  ))

export default Categories
