// @flow

import React from 'react'
import { Category } from './category'

type Props = {
  categories: ?Array<Object>,
  selected: Array<String>,
  onCategorySelect: Function,
}

const isSelected = (selected: Array<String>) => (id: string) => selected.includes(id)

const onChange = (selected: Array<String>, fn: Function) => (event: SyntheticEvent<HTMLInputElement>) => {
  if (event.currentTarget.checked) {
    return fn([...selected, event.currentTarget.value])
  }

  return fn(selected.filter(cat => cat !== event.currentTarget.value))
}

const Categories = ({ categories, selected, onCategorySelect }: Props) => (
  <React.Fragment>
    <p>Categories:</p>
    {categories && categories.map((category: Object) => (
      <Category
        key={category._id}
        category={category}
        checked={isSelected(selected)}
        onChange={onChange(selected, onCategorySelect)}
      />))}
  </React.Fragment>
)

export { Categories }
