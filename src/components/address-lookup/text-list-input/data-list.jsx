// @flow

import React from 'react'

type Props = {
  items: Array<Object>,
  onSelect: Function,
}

const DataList = ({ items, onSelect }: Props) => (
  <ul>
    {items.map(item => (
      <li
        key={item.id}
        role="presentation"
        onClick={() => { onSelect(item) }}
      >
        {item.option}
      </li>
    ))}
  </ul>
)

export { DataList }
