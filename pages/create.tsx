import { createMeme } from "@actions/meme"
import { Button, Container, Divider, Grid, Image, Segment } from "semantic-ui-react"
import { Provider, connect } from "react-redux"
import BlankImg from "@public/images/blank.png"
import Draggable from "react-draggable"
import Head from "next/head"
import Header from "@components/header"
import html2canvas from "html2canvas"
import ImgBox from "@components/imgBox"
import PropTypes from "prop-types"
import React, { Fragment, useCallback, useEffect, useState } from "react"
import store from "@store"
import TextBox from "@components/textBox"

const Create: React.FunctionComponent = (props) => {
	let [images, setImages] = useState(props.images)

	const addMoreImage = () => {
		let newImages = [
			...images,
			{
				active: true,
				img: "",
				texts: [
					{
						activeDrags: 0,
						color: "#000000",
						font: "Arial",
						size: 32,
						text: "",
						x: 0,
						y: 10
					}
				]
			}
		]
		newImages.map((img, i) => {
			if (i !== newImages.length - 1) {
				newImages[i].active = false
			}
		})
		setImages(newImages)
	}

	const addMoreText = (imgIndex) => {
		let newImages = [...images]
		const texts = images[imgIndex].texts
		const textCount = texts.length
		let lastY = texts[textCount - 1].y
		if (isNaN(lastY)) {
			lastY = 0
		}

		let newTexts = [
			...images[imgIndex].texts,
			{
				activeDrags: 0,
				color: "#000000",
				font: "Arial",
				size: 32,
				text: "",
				x: 0,
				y: lastY + 40
			}
		]
		newImages[imgIndex].texts = newTexts
		setImages(newImages)
	}

	const changeColor = (imgIndex, textIndex, value) => {
		let newImages = [...images]
		newImages[imgIndex].texts[textIndex].color = value.hex
		setImages(newImages)
	}

	const changeImgUrl = (imgIndex, value) => {
		let newImages = [...images]
		newImages[imgIndex].img = value
		setImages(newImages)
	}

	const changeFont = (imgIndex, textIndex, value) => {
		let newImages = [...images]
		newImages[imgIndex].texts[textIndex].font = value
		setImages(newImages)
	}

	const changeFontSize = (imgIndex, textIndex, value) => {
		if (isNaN(value)) {
			return
		}

		let newImages = [...images]
		newImages[imgIndex].texts[textIndex].size = value
		setImages(newImages)
	}

	const changeText = (imgIndex, textIndex, value) => {
		let newImages = [...images]
		newImages[imgIndex].texts[textIndex].text = value
		setImages(newImages)
	}

	const clickImg = (imgIndex) => {
		let newImages = [...images]
		newImages.map((img, i) => {
			newImages[i].active = false
		})
		newImages[imgIndex].active = true
		setImages(newImages)
	}

	const createMeme = async () => {
		html2canvas(document.getElementById("memeContainer"), {
			allowTaint: true,
			scale: 1,
			scrollY: -window.scrollY,
			useCORS: true
		}).then((canvas) => {
			let ctx = canvas.getContext("2d")
			ctx.globalAlpha = 1
			const img = canvas.toDataURL("image/png")
			props.createMeme({ callback: () => downloadMeme(img), images })
		})
	}

	const downloadMeme = (img) => {
		let link = document.createElement("a")
		link.download = `meme.png`
		link.href = img
		link.click()
	}

	const handleDrag = (imgIndex, textIndex, e, ui) => {
		const { x, y } = images[imgIndex].texts[textIndex]
		let newImages = [...images]
		newImages[imgIndex].texts[textIndex].x = x + ui.deltaX
		newImages[imgIndex].texts[textIndex].y = y + ui.deltaY
		setImages(newImages)
	}

	const handleDragStart = (imgIndex, textIndex) => {
		let newImages = [...images]
		++newImages[imgIndex].texts[textIndex].activeDrags
		setImages(newImages)
	}

	const handleDragStop = (imgIndex, textIndex) => {
		let newImages = [...images]
		--newImages[imgIndex].texts[textIndex].activeDrags
		setImages(newImages)
	}

	console.log("images")
	console.log(images)

	return (
		<Provider store={store}>
			<div className="createPage">
				<Head>
					<title>Create a meme - Brandy</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Header />

				<Container className="mainContainer">
					<Grid>
						<Grid.Row>
							<Grid.Column width={10}>
								<div id="memeContainer">
									{images.map((_img, i) => {
										const { active, img, texts } = _img
										return (
											<div
												className="draggableWrapper"
												key={`draggableWrapper${i}`}
											>
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
							</Grid.Column>
							<Grid.Column width={6}>
								{images.map((_img, i) => {
									const { active, img, texts } = _img
									if (active) {
										return (
											<Segment key={`textSegment${i}`} stacked>
												<ImgBox
													changeImgUrl={changeImgUrl}
													imgIndex={i}
													imgUrl={img}
												/>
												<Divider horizontal>Text 1</Divider>
												{texts.map((text, x) => (
													<Fragment key={`textFragment${x}`}>
														<TextBox
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
														{x === texts.length - 1 ? (
															<Divider />
														) : (
															<Divider horizontal>
																Text {x + 2}
															</Divider>
														)}
													</Fragment>
												))}
												<Button
													color="black"
													content="Add more text"
													fluid
													onClick={() => addMoreText(i)}
												/>
											</Segment>
										)
									}

									return null
								})}
								<p className="addAnotherImage">
									<span onClick={addMoreImage}>Add another image</span>
								</p>
							</Grid.Column>
						</Grid.Row>
					</Grid>

					<Divider section />

					<Button
						color="blue"
						content="Create a meme"
						fluid
						onClick={createMeme}
						size="big"
					/>
				</Container>
			</div>
		</Provider>
	)
}

Create.propTypes = {
	createMeme: PropTypes.func,
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

Create.defaultProps = {
	createMeme
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.meme,
	...ownProps
})

export default connect(mapStateToProps, {
	createMeme
})(Create)
