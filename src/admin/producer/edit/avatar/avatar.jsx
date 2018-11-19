// @flow

import React from 'react'
import { FileUpload } from 'common/components/file-upload'
import { ASSET_BASE } from '../../../../config'

type Props = {
  isLoading: boolean,
  hasErrored: boolean,
  upload: Object,
  userId: string,
  onUploadFile: Function,
  previewPath: ?string,
}

type State = {
  previewPath: ?string,
}

export class Avatar extends React.Component<Props, State> {
  static defaultProps: Object

  constructor(props: Props) {
    super(props)

    this.state = {
      previewPath: this.props.previewPath,
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.previewPath === null) {
      this.setState({
        previewPath: nextProps.previewPath,
      })
    }

    if (nextProps.upload && nextProps.upload !== this.props.upload) {
      this.setState({
        previewPath: nextProps.upload.filename,
      })
    }
  }

  renderPreview() {
    const { previewPath } = this.state

    if (previewPath) {
      return <img alt="" style={{ width: '200px' }} src={`${ASSET_BASE}/${previewPath}`} />
    }

    return null
  }

  render() {
    const { hasErrored, isLoading, upload, onUploadFile, userId } = this.props
    return (
      <div>
        {this.renderPreview()}
        <FileUpload
          hasErrored={hasErrored}
          isLoading={isLoading}
          hasUploaded={!!upload}
          label="Avatar"
          name="avatar"
          onUploadFile={onUploadFile}
          uploadKey={userId}
        />
      </div>
    )
  }
}

Avatar.defaultProps = {
  previewPath: null,
}
