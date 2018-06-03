// @flow

import React from 'react'
import Button from 'common/components/button'
import List from 'common/components/list'
import Modal from 'common/components/modal'
import { APP_URL, PRODUCER_PATH, SHARE_HASHTAGS, TWITTER_HANDLE } from '../../../config'

type Props = {
  isSharing: boolean,
  shareProfile: Function,
  producer: Object,
}

const ShareProfile = ({ isSharing, producer, shareProfile }: Props) => (
  <React.Fragment>
    <Button onClick={() => { shareProfile(!isSharing) }}>Share this profile</Button>
    <Modal isVisible={isSharing} toggleVisibility={() => { shareProfile(!isSharing) }}>
      <h3 className="u-h2">Share {producer.title} with the world</h3>
      <List bare className="u-margin-none">
        <li className="u-margin-bottom-sm">
          <Button
            level="facebook"
            target="_blank"
            href={`https://facebook.com/sharer/sharer.php?u=${APP_URL}/${PRODUCER_PATH}/${producer.user_id}`}
            block
          >
            Share on Facebook
          </Button>
        </li>
        <li>
          <Button
            level="twitter"
            target="_blank"
            href={`https://twitter.com/intent/tweet/?url=${APP_URL}/${PRODUCER_PATH}/${producer.user_id}&text=${producer.title}&hashtags=${SHARE_HASHTAGS}&via=${TWITTER_HANDLE}`}
            block
          >
            Share on Twitter
          </Button>
        </li>
      </List>
    </Modal>
  </React.Fragment>
)

export default ShareProfile
