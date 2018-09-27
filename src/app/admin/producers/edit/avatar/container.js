// @flow

import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { uploads } from 'src/domain'
import { Avatar } from './avatar'

const { uploadFileWithAPI } = uploads.actions

const AVATAR_UPLOAD_ID = 'avatar'

const mapStateToProps = (state: Object, ownProps: Object) => ({
  isLoading: state.domain.uploads.meta.isFetching.includes(AVATAR_UPLOAD_ID),
  hasErrored: state.domain.uploads.meta.hasErrored.includes(AVATAR_UPLOAD_ID),
  upload: state.domain.uploads.data.find(upload => upload.id === AVATAR_UPLOAD_ID),
  userId: ownProps.match.params.userId,
  previewPath: state.domain.admin.producer.data ? state.domain.admin.producer.data.avatar : null,
})

const mapDispatchToProps = {
  onUploadFile: uploadFileWithAPI,
}

export const container = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Avatar))
