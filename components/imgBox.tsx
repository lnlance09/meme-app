import { Button, Divider, Input } from "semantic-ui-react"
import { useDropzone } from "react-dropzone"
import PropTypes from "prop-types"
import React, { useCallback, useEffect, useState } from "react"

const ImgBox: React.FunctionComponent = (props) => {
	const { changeImgUrl, imgIndex, imgUrl } = props

	useEffect(() => {}, [])

	const onDrop = useCallback((acceptedFiles) => {}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	return (
		<div className="textBox">
			<Input
				fluid
				icon="paperclip"
				onChange={(e, { value }) => changeImgUrl(imgIndex, value)}
				placeholder="Image URL"
				value={imgUrl}
			/>
			<Divider horizontal>or</Divider>
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				<Button color="green" content="Upload" fluid />
			</div>
		</div>
	)
}

ImgBox.propTypes = {
	changeImgUrl: PropTypes.func,
	imgUrl: PropTypes.string
}

ImgBox.defaultProps = {}

export default ImgBox
