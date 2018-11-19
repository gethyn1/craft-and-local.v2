// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { EDIT_PRODUCERS_PATH } from 'common/constants/paths'

type Props = {
  producer: {
    title: string,
    userId: string,
  },
}

export const Producer = ({ producer }: Props) => (
  <p>{producer.title} - <Link to={`${EDIT_PRODUCERS_PATH}/${producer.userId}`}>Edit producer</Link></p>
)
