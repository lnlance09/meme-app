import { createMeme } from "@actions/meme"
import { toDataURL } from "@utils/imageFunctions"
import { Button, Divider, Grid } from "semantic-ui-react"
import { Provider, connect } from "react-redux"
import DefaultLayout from "@layouts/default"
import html2canvas from "html2canvas"
import MemeConfig from "@components/memeConfig"
import MemeImages from "@components/memeImages"
import PropTypes from "prop-types"
import React, { useState } from "react"
import store from "@store"

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

	const onFileUpload = (base64, img, imgIndex) => {
		let newImages = [...images]
		newImages[imgIndex].base64 = base64
		newImages[imgIndex].img = img
		setImages(newImages)
	}

	const onKeyUp = (e, imgIndex) => {
		if (e.keyCode === 8) {
			let newImages = [...images]
			newImages[imgIndex].img = ""
			setImages(newImages)
		}
	}

	const onPaste = (e, imgIndex) => {
		const url = e.clipboardData.getData("Text")
		const base64 = ""
		let newImages = [...images]
		newImages[imgIndex].base64 = base64
		newImages[imgIndex].img = url
		setImages(newImages)
	}

	console.log("images")
	console.log(images)

	return (
		<Provider store={store}>
			<DefaultLayout
				seo={{
					description: "",
					image: {
						height: 200,
						src: "",
						width: 200
					},
					title: "",
					url: ""
				}}
			>
				<Grid>
					<Grid.Row>
						<Grid.Column width={10}>
							<MemeImages
								clickImg={clickImg}
								handleDrag={handleDrag}
								handleDragStart={handleDragStart}
								handleDragStop={handleDragStop}
								images={images}
							/>
						</Grid.Column>
						<Grid.Column width={6}>
							<MemeConfig
								addMoreText={addMoreText}
								changeColor={changeColor}
								changeFont={changeFont}
								changeFontSize={changeFontSize}
								changeText={changeText}
								images={images}
								onFileUpload={onFileUpload}
								onKeyUp={onKeyUp}
								onPaste={onPaste}
							/>
							<p className="addAnotherImage">
								<span onClick={addMoreImage}>Add another image</span>
							</p>
						</Grid.Column>
					</Grid.Row>
				</Grid>

				<Divider section />

				<Button color="blue" content="CREATE" fluid onClick={createMeme} size="big" />
			</DefaultLayout>
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
