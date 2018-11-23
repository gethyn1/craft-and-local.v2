// @flow

import React from 'react'
import Container from 'components/container'
import List from 'components/list'
import { Producer } from './producer'
import { DefaultLayout } from '../../../layouts/default-layout'

type Props = {
  isLoading: boolean,
  hasErrored: boolean,
  producers: Array<Object>,
}

export const Producers = ({ isLoading, hasErrored, producers }: Props) => (
  <DefaultLayout>
    <Container>
      <h2>Producers</h2>
      {isLoading && <p>Loading producers ...</p>}
      {hasErrored && <p>Error loading producers</p>}
      <List bare>
        {producers.map(producer => (
          <li key={producer._id}>
            <Producer producer={producer} />
          </li>))}
      </List>
    </Container>
  </DefaultLayout>
)
