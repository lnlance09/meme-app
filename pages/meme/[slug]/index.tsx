import "moment-timezone"
import { getMeme } from "@actions/meme"
import {
	Button,
	Divider,
	Form,
	Grid,
	Header,
	Image,
	Placeholder,
	TextArea
} from "semantic-ui-react"
import { parseJwt } from "@utils/tokenFunctions"
import { useRouter } from "next/router"
import { Provider, connect } from "react-redux"
import DefaultLayout from "@layouts/default"
import html2canvas from "html2canvas"
import Link from "next/link"
import MemeImages from "@components/memeImages"
import Moment from "react-moment"
import PropTypes from "prop-types"
import React, { Fragment, useEffect, useState } from "react"
import store from "@store"

const Meme: React.FunctionComponent = ({ getMeme, meme }) => {
	const router = useRouter()
	const { slug } = router.query

	const { data, error, errorMsg, loading } = meme
	const { createdAt, name, s3Link, templates, user, views } = data

	const [caption, setCaption] = useState(data.caption)
	const [currentUser, setCurrentUser] = useState({})

	useEffect(() => {
		const userData = parseJwt()
		if (userData) {
			setCurrentUser(userData)
		}

		if (typeof slug !== "undefined") {
			getMeme({ id: slug })
		}
	}, [slug])

	const downloadMeme = () => {
		html2canvas(document.getElementById("memeContainer"), {
			allowTaint: true,
			scale: 1,
			scrollY: -window.scrollY,
			useCORS: true
		}).then((canvas) => {
			let ctx = canvas.getContext("2d")
			ctx.globalAlpha = 1
			const img = canvas.toDataURL("image/png")
			let link = document.createElement("a")
			link.download = `meme.png`
			link.href = img
			link.click()
		})
	}

	const onClickTemplate = (templateId) => {
		router.push(`/template/${templateId}`)
	}

	const rightColumn = (
		<Fragment>
			<Header as="h1">
				{name === null ? "Unititled Meme" : name}
				<Header.Subheader>
					<Moment date={createdAt} fromNow /> •{" "}
					<Link href={`/artists/${user.username}`}>
						<a>{user.username}</a>
					</Link>{" "}
					• {views} views
				</Header.Subheader>
			</Header>

			{currentUser.id === user.id ? (
				<Form>
					<TextArea
						onChange={(e, { value }) => setCaption(value)}
						placeholder="Caption"
						rows={5}
						value={caption}
					/>
				</Form>
			) : (
				<Header as="p" className="memeCaption">
					{data.caption}
				</Header>
			)}

			<div style={{ margin: "24px 0 12px 0" }}>
				<Image.Group className="templateImages" itemsPerRow={2} size="tiny">
					{templates.map((template) => (
						<Image
							borderless
							onClick={() => onClickTemplate(template.templateId)}
							src={template.img}
							ui={false}
						/>
					))}
				</Image.Group>
			</div>

			<Button.Group widths="2">
				<Button color="blue" content="Download" icon="download" onClick={downloadMeme} />
				<Button
					color="yellow"
					content="Fork"
					icon="fork"
					onClick={() => router.push(`/create?id=${slug}`)}
				/>
			</Button.Group>
		</Fragment>
	)

	return (
		<Provider store={store}>
			<DefaultLayout
				containerClassName="memePage"
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
				showFooter={false}
			>
				<Fragment>
					<Grid stackable>
						<Grid.Row>
							<Grid.Column width={11}>
								{loading ? (
									<Placeholder fluid>
										<Placeholder.Image square />
									</Placeholder>
								) : (
									<MemeImages editable={false} images={templates} />
								)}
							</Grid.Column>
							<Grid.Column width={5}>{!loading && rightColumn}</Grid.Column>
						</Grid.Row>
					</Grid>
				</Fragment>
			</DefaultLayout>
		</Provider>
	)
}

Meme.propTypes = {
	getMeme: PropTypes.func,
	meme: PropTypes.shape({
		data: PropTypes.shape({
			caption: PropTypes.string,
			createdAt: PropTypes.string,
			name: PropTypes.string,
			s3Link: PropTypes.string,
			templates: PropTypes.arrayOf(
				PropTypes.shape({
					img: PropTypes.string,
					name: PropTypes.string,
					templateId: PropTypes.number,
					texts: PropTypes.arrayOf(
						PropTypes.shape({
							color: PropTypes.string,
							font: PropTypes.string,
							size: PropTypes.number,
							text: PropTypes.string,
							x: PropTypes.number,
							y: PropTypes.number
						})
					)
				})
			),
			user: PropTypes.shape({
				id: PropTypes.number,
				img: PropTypes.string,
				name: PropTypes.string,
				username: PropTypes.string
			}),
			views: PropTypes.number
		}),
		error: PropTypes.bool,
		errorMsg: PropTypes.string,
		loading: PropTypes.bool
	})
}

Meme.defaultProps = {
	getMeme,
	meme: {}
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.meme,
	...ownProps
})

export default connect(mapStateToProps, {
	getMeme
})(Meme)
