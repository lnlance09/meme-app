import { createMeme, getMeme } from "@actions/meme"
import { Button, Divider, Form, Grid, TextArea } from "semantic-ui-react"
import { useRouter } from "next/router"
import { Provider, connect } from "react-redux"
import axios from "axios"
import DefaultLayout from "@layouts/default"
import MemeConfig from "@components/memeConfig"
import MemeImages from "@components/memeImages"
import PropTypes from "prop-types"
import React, { useCallback, useEffect, useState } from "react"
import store from "@store"

const Create: React.FunctionComponent = (props) => {
	const router = useRouter()
	const { id } = router.query

	const [bearer, setBearer] = useState("")
	const [caption, setCaption] = useState("")
	const [formVisible, setFormVisible] = useState(false)
	const [images, setImages] = useState(props.images)
	const [processing, setProcessing] = useState(false)

	useEffect(() => {
		const token = localStorage.getItem("jwtToken")
		if (typeof token !== "undefined") {
			setBearer(token)
		}

		if (typeof id !== "undefined") {
			props.getMeme({ callback: (data) => setImages(data), setImages, id })
		}
	}, [id])

	const addMoreImage = useCallback(() => {
		images.map((img, i) => {
			images[i].active = false
		})
		let newImages = [
			...images,
			{
				active: true,
				img: "",
				path: null,
				texts: [
					{
						activeDrags: 0,
						backgroundColor: "transparent",
						color: "#0c243c",
						font: "OswaldRegular",
						size: "32",
						text: "",
						x: 0,
						y: 10
					}
				]
			}
		]
		setImages(newImages)
	}, [images])

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
				backgroundColor: "transparent",
				color: "#0c243c",
				font: "OswaldRegular",
				size: "32",
				text: "",
				x: 0,
				y: lastY + 35
			}
		]
		newImages[imgIndex].texts = newTexts
		setImages(newImages)
	}

	const changeBackgroundColor = (imgIndex, textIndex, value) => {
		let newImages = [...images]
		newImages[imgIndex].texts[textIndex].backgroundColor = value.hex
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
		if (!formVisible) {
			setFormVisible(true)
			return
		}

		setProcessing(true)
		props.createMeme({ bearer, caption, images })
	}

	const createTemplate = (img, imgIndex, isFile) => {
		axios
			.post("/api/template/create", {
				img
			})
			.then(async (response) => {
				const { data } = response
				if (!data.error) {
					let newImages = [...images]
					newImages[imgIndex].templateId = data.id
					setImages(newImages)
				}
			})
			.catch((error) => {
				console.log(error)
			})
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
		newImages[imgIndex].texts[textIndex].activeDrags++
		setImages(newImages)
	}

	const handleDragStop = (imgIndex, textIndex) => {
		let newImages = [...images]
		newImages[imgIndex].texts[textIndex].activeDrags--
		setImages(newImages)
	}

	const onFileUpload = (path, img, imgIndex) => {
		createTemplate(img, imgIndex, true)
		let newImages = [...images]
		newImages[imgIndex].img = img
		newImages[imgIndex].path = path
		setImages(newImages)
	}

	const onKeyUp = (e, imgIndex) => {
		if (e.keyCode === 8) {
			let newImages = [...images]
			newImages[imgIndex].img = ""
			newImages[imgIndex].path = null
			setImages(newImages)
		}
	}

	const onPaste = (e, imgIndex) => {
		const url = e.clipboardData.getData("Text")
		createTemplate(url, imgIndex, false)

		let newImages = [...images]
		newImages[imgIndex].img = url
		setImages(newImages)
	}

	console.log("images", images)

	return (
		<Provider store={store}>
			<DefaultLayout
				seo={{
					description: "Creating a meme was never so quick and easy",
					image: {
						height: 200,
						src: "",
						width: 200
					},
					title: "Create a Meme",
					url: ""
				}}
				showFooter={false}
			>
				<Grid stackable>
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
								changeBackgroundColor={changeBackgroundColor}
								changeColor={changeColor}
								changeFont={changeFont}
								changeFontSize={changeFontSize}
								changeText={changeText}
								images={images}
								onFileUpload={onFileUpload}
								onKeyUp={onKeyUp}
								onPaste={onPaste}
							/>
							<Button
								color="green"
								content="Add an image"
								fluid
								icon="image"
								onClick={addMoreImage}
								style={{ marginTop: "16px" }}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>

				<Divider hidden />

				{formVisible && (
					<Form size="big">
						<TextArea
							placeholder="Caption (Optional)"
							onChange={(e, { value }) => setCaption(value)}
							row={3}
							value={caption}
						/>
						<Divider hidden />
					</Form>
				)}

				<Button
					color="blue"
					content="Create"
					fluid
					loading={processing}
					onClick={createMeme}
					size="big"
				/>
			</DefaultLayout>
		</Provider>
	)
}

Create.propTypes = {
	createMeme: PropTypes.func,
	getMeme: PropTypes.func,
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
					size: PropTypes.string,
					text: PropTypes.string,
					x: PropTypes.number,
					y: PropTypes.number
				})
			)
		})
	)
}

Create.defaultProps = {
	createMeme,
	getMeme
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.meme,
	...ownProps
})

export default connect(mapStateToProps, {
	createMeme,
	getMeme
})(Create)
