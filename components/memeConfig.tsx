import { Button, Divider, Segment } from "semantic-ui-react"
import ImgBox from "@components/imgBox"
import PropTypes from "prop-types"
import React, { Fragment } from "react"
import TextBox from "@components/textBox"

const MemeConfig: React.FunctionComponent = (props) => {
	const {
		addMoreText,
		changeBackgroundColor,
		changeColor,
		changeFont,
		changeFontSize,
		changeText,
		images,
		onFileUpload,
		onKeyUp,
		onPaste
	} = props

	return (
		<div className="memeConfig">
			{images.map((_img, i) => {
				const { active, img, path, texts } = _img
				if (active) {
					return (
						<Segment key={`textSegment${i}`}>
							<ImgBox
								imgIndex={i}
								imgUrl={path ? path : img}
								onFileUpload={onFileUpload}
								onKeyUp={onKeyUp}
								onPaste={onPaste}
							/>
							<Divider horizontal>Text 1</Divider>
							{texts.map((text, x) => (
								<Fragment key={`textFragment${x}`}>
									<TextBox
										backgroundColor={text.backgroundColor}
										changeBackgroundColor={changeBackgroundColor}
										changeColor={changeColor}
										changeFont={changeFont}
										changeFontSize={changeFontSize}
										changeText={changeText}
										color={text.color}
										font={text.font}
										fontSize={text.size}
										imgIndex={i}
										text={text.text}
										textIndex={x}
									/>
									{x !== texts.length - 1 && (
										<Divider horizontal>text {x + 2}</Divider>
									)}
								</Fragment>
							))}
							<Divider />
							<Button
								color="black"
								content="More text"
								fluid
								icon="font"
								onClick={() => addMoreText(i)}
							/>
						</Segment>
					)
				}

				return null
			})}
		</div>
	)
}

MemeConfig.propTypes = {
	addMoreText: PropTypes.func,
	changeBackgroundColor: PropTypes.func,
	changeColor: PropTypes.func,
	changeFont: PropTypes.func,
	changeFontSize: PropTypes.func,
	changeText: PropTypes.func,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			active: PropTypes.bool,
			img: PropTypes.string,
			path: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
			texts: PropTypes.arrayOf(
				PropTypes.shape({
					activeDrags: PropTypes.number,
					backgroundColor: PropTypes.string,
					color: PropTypes.string,
					font: PropTypes.string,
					height: PropTypes.number,
					size: PropTypes.string,
					text: PropTypes.string,
					width: PropTypes.number,
					x: PropTypes.number,
					y: PropTypes.number
				})
			)
		})
	),
	onFileUpload: PropTypes.func,
	onKeyUp: PropTypes.func,
	onPaste: PropTypes.func
}

MemeConfig.defaultProps = {}

export default MemeConfig
