// @flow

import React from 'react'

type Props = {
  category: {
    _id: string,
    title: string,
  },
  onChange: Function,
  checked: Function,
}

export const Category = ({ category, onChange, checked }: Props) => (
  <div>
    <input
      type="checkbox"
      checked={checked(category._id)}
      onChange={onChange}
      id={category._id}
      value={category._id}
      name="categories"
    />&nbsp;
    <label htmlFor={category._id}>{category.title}</label>
  </div>
)
