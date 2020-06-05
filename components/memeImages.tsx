import { Image } from "semantic-ui-react"
import BlankImg from "@public/images/blank.png"
import Draggable from "react-draggable"
import PropTypes from "prop-types"
import React, { useEffect } from "react"

const MemeImages: React.FunctionComponent = ({
	clickImg,
	editable,
	handleDrag,
	handleDragStart,
	handleDragStop,
	images
}) => {
	useEffect(() => {}, [images])

	return (
		<div id="memeContainer">
			{images.map((_img, i) => {
				const { active, img, texts } = _img
				return (
					<div className="draggableWrapper" key={`draggableWrapper${i}`}>
						{texts.map((text, x) => {
							console.log("text", text)
							if (text.text === "") {
								return
							}

							const textBlock = (
								<div
									className={`memeText ${editable ? "" : "disabled"}`}
									key={`textBlock${x}${i}`}
									style={{
										backgroundColor: text.backgroundColor,
										color: text.color,
										fontFamily: text.font,
										fontSize: `${text.size}px`
									}}
								>
									{text.text}
								</div>
							)

							return (
								<Draggable
									bounds="parent"
									defaultPosition={{ x: text.x, y: text.y }}
									handle=".memeText"
									key={`draggable${x}`}
									onDrag={(e, ui) => handleDrag(i, x, e, ui)}
									onStart={() => {
										if (!editable) {
											return false
										}
										handleDragStart(i, x)
									}}
									onStop={() => handleDragStop(i, x)}
								>
									{textBlock}
								</Draggable>
							)
						})}
						<Image
							className={`memeImg ${active && editable ? "active" : ""}`}
							crossOrigin={editable ? null : "anonymous"}
							id={`memeConfigImg${i}`}
							inline
							onClick={() => {
								if (editable) {
									clickImg(i)
								}
							}}
							onError={(i) => (i.target.src = BlankImg)}
							src={
								img === ""
									? "/images/blank.png"
									: `${img}?timestamp=${new Date().getTime()}`
							}
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
					backgroundColor: PropTypes.string,
					color: PropTypes.string,
					font: PropTypes.string,
					size: PropTypes.string,
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
