import { Image } from "semantic-ui-react"
import BlankImg from "@public/images/blank.png"
import Draggable from "react-draggable"
import PropTypes from "prop-types"
import React from "react"

const MemeImages: React.FunctionComponent = (props) => {
	const { clickImg, handleDrag, handleDragStart, handleDragStop, images } = props

	return (
		<div id="memeContainer">
			{images.map((_img, i) => {
				const { active, img, texts } = _img
				return (
					<div className="draggableWrapper" key={`draggableWrapper${i}`}>
						{texts.map((text, x) => (
							<Draggable
								bounds="parent"
								handle=".memeText"
								key={`draggable${x}`}
								onDrag={(e, ui) => handleDrag(i, x, e, ui)}
								onStart={() => handleDragStart(i, x)}
								onStop={() => handleDragStop(i, x)}
							>
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
							</Draggable>
						))}
						<Image
							className={`memeImg ${active ? "active" : ""}`}
							inline
							onClick={() => clickImg(i)}
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
	handleDrag: PropTypes.func,
	handleDragStart: PropTypes.func,
	handleDragStop: PropTypes.func,
	images: PropTypes.arrayOf(
		PropTypes.shape({
			active: PropTypes.bool,
			img: PropTypes.string,
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

MemeImages.defaultProps = {}

export default MemeImages
