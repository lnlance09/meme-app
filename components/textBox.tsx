import { Form, Input, Select, TextArea } from "semantic-ui-react"
import { BlockPicker } from "react-color"
import { fontOptions } from "@options/fonts"
import PropTypes from "prop-types"
import React, { useState } from "react"

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
				<Form.Group className="colorFields" unstackable>
					<Form.Field width={11}>
						<Select
							onChange={(e, { value }) => changeFont(imgIndex, textIndex, value)}
							options={fontOptions}
							search
							value={font}
						/>
					</Form.Field>
					<Form.Field width={5}>
						<Input
							label={{ basic: true, content: "px" }}
							labelPosition="right"
							maxLength={3}
							onChange={(e, { value }) => changeFontSize(imgIndex, textIndex, value)}
							type="text"
							value={fontSize}
						/>
					</Form.Field>
				</Form.Group>
				<Form.Group unstackable>
					<Form.Field width={8}>
						<div className="colorSelectionWrapper" onClick={toggleColorPicker}>
							<div
								className="colorSelection"
								style={{
									background: color,
									width: "100%"
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
					<Form.Field width={8}>
						<div className="colorSelectionWrapper" onClick={toggleColorPicker}>
							<div
								className="colorSelection"
								style={{
									background: color,
									width: "100%"
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
