import { Form, Input, Select, TextArea, Transition, TransitionablePortal } from "semantic-ui-react"
import { BlockPicker } from "react-color"
import { fontOptions } from "@options/fonts"
import PropTypes from "prop-types"
import React, { useCallback, useEffect, useState } from "react"

const TextBox: React.FunctionComponent = (props) => {
	const {
		changeColor,
		changeFont,
		changeFontSize,
		changeText,
		color,
		font,
		fontSize,
		imgIndex,
		text,
		textIndex
	} = props

	const [colorPickerOpen, setColorPicker] = useState(false)

	// useEffect((props) => {}, [text])

	const toggleColorPicker = () => {
		setColorPicker(!colorPickerOpen)
	}

	return (
		<div className="textBox">
			<Form>
				<Form.Field>
					<TextArea
						placeholder="Text"
						onChange={(e, { value }) => changeText(imgIndex, textIndex, value)}
						rows={2}
						value={text}
					/>
				</Form.Field>
				<Form.Field>
					<Select
						onChange={(e, { value }) => changeFont(imgIndex, textIndex, value)}
						options={fontOptions}
						search
						value={font}
					/>
				</Form.Field>
				<Form.Group widths="equal">
					<Form.Field>
						<Input
							fluid
							label={{ basic: true, content: "px" }}
							labelPosition="right"
							maxLength={3}
							onChange={(e, { value }) => changeFontSize(imgIndex, textIndex, value)}
							type="text"
							value={fontSize}
						/>
					</Form.Field>
					<Form.Field>
						<div className="colorSelectionWrapper" onClick={toggleColorPicker}>
							<div
								className="colorSelection"
								style={{
									background: color
								}}
							/>
						</div>
						{colorPickerOpen && (
							<div className="colorPickerWrapper">
								<div className="colorPickerOverlay" onClick={toggleColorPicker} />
								<BlockPicker
									onChange={(color) => changeColor(imgIndex, textIndex, color)}
									triangle="hide"
								/>
							</div>
						)}
					</Form.Field>
				</Form.Group>
			</Form>
		</div>
	)
}

TextBox.propTypes = {
	changeColor: PropTypes.func,
	changeFont: PropTypes.func,
	changeFontSize: PropTypes.func,
	changeText: PropTypes.func,
	color: PropTypes.string,
	font: PropTypes.string,
	fontSize: PropTypes.number,
	imgIndex: PropTypes.number,
	text: PropTypes.string,
	textIndex: PropTypes.number
}

TextBox.defaultProps = {}

export default TextBox
