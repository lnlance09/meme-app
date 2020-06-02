import { Image } from "semantic-ui-react"
import BlankImg from "@public/images/blank.png"
import Draggable from "react-draggable"
import PropTypes from "prop-types"
import React from "react"

const MemeImages: React.FunctionComponent = ({
	clickImg,
	editable,
	handleDrag,
	handleDragStart,
	handleDragStop,
	images
}) => {
	return (
		<div id="memeContainer">
			{images.map((_img, i) => {
				const { active, img, texts } = _img
				return (
					<div className="draggableWrapper" key={`draggableWrapper${i}`}>
						{texts.map((text, x) => {
							const textBlock = (
								<div
									className="memeText"
									style={{
										color: text.color,
										fontFamily: text.font,
										fontSize: `${text.size}px`,
										top: `${text.y}px`
									}}
								>
									{text.text}
								</div>
							)

							if (editable) {
								return (
									<Draggable
										bounds="parent"
										handle=".memeText"
										key={`draggable${x}`}
										onDrag={(e, ui) => handleDrag(i, x, e, ui)}
										onStart={() => handleDragStart(i, x)}
										onStop={() => handleDragStop(i, x)}
									>
										{textBlock}
									</Draggable>
								)
							}

							return textBlock
						})}
						<Image
							className={`memeImg ${active ? "active" : ""}`}
							inline
							onClick={() => {
								if (editable) {
									clickImg(i)
								}
							}}
							onError={(i) => (i.target.src = BlankImg)}
							src={img === "" ? "/images/blank.png" : img}
						/>
					</div>
				)
			})}
		</div>
	)
}

MemeImages.propTypes = {
	clickImg: PropTypes.func,
	editable: PropTypes.bool,
	handleDrag: PropTypes.func,
	handleDragStart: PropTypes.func,
	handleDragStop: PropTypes.func,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			active: PropTypes.bool,
			img: PropTypes.string,
			name: PropTypes.string,
			path: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
			templateId: PropTypes.number,
			texts: PropTypes.arrayOf(
				PropTypes.shape({
					activeDrags: PropTypes.number,
					color: PropTypes.string,
					font: PropTypes.string,
					size: PropTypes.number,
					text: PropTypes.string,
					x: PropTypes.number,
					y: PropTypes.number
				})
			)
		})
	)
}

MemeImages.defaultProps = {
	editable: true
}

export default MemeImages
