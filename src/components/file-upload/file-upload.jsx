// @flow

import React from 'react'

type Props = {
  hasErrored: boolean,
  isLoading: boolean,
  hasUploaded: boolean,
  label: ?string,
  name: string,
  onUploadFile: Function,
  uploadKey: Object,
}

type State = {
  file: ?Object,
}

class FileUpload extends React.Component<Props, State> {
  static defaultProps: Object

  constructor(props: Props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  componentDidMount() {
    this.state = {
      file: null,
    }
  }

  handleChange(event: SyntheticEvent<HTMLInputElement>) {
    event.preventDefault()

    this.setState({
      file: event.currentTarget.files[0],
    })
  }

  handleUpload() {
    this.props.onUploadFile(this.props.name, this.state.file, this.props.uploadKey)
  }

  handleChange: Function
  handleUpload: Function

  render() {
    const {
      isLoading,
      hasErrored,
      hasUploaded,
      label,
      name,
    } = this.props

    let status

    if (isLoading) {
      status = <p data-test-id="file-upload-loading">Uploading image ...</p>
    } else if (hasErrored) {
      status = <p data-test-id="file-upload-error">There was an error uploading the image</p>
    } else if (hasUploaded) {
      status = <p>Image succesfully uploaded</p>
    }

    return (
      <div>
        {status}
        {label && <label htmlFor={name}>{label}</label>}<br />
        <input type="file" name={name} onChange={this.handleChange} />
        <button data-name={name} onClick={this.handleUpload}>Upload</button>
      </div>
    )
  }
}

FileUpload.defaultProps = {
  uploadKey: null,
}

export { FileUpload }
