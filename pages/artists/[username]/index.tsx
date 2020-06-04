import { changeProfilePic, getUser } from "@actions/user"
import {
	Button,
	Dimmer,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	List,
	Placeholder
} from "semantic-ui-react"
import { s3BaseUrl } from "@options/config"
import { parseJwt } from "@utils/tokenFunctions"
import { useRouter } from "next/router"
import { useDropzone } from "react-dropzone"
import { Provider, connect } from "react-redux"
import DefaultLayout from "@layouts/default"
import DefaultPic from "@public/images/avatar/large/steve.jpg"
import Moment from "react-moment"
import PropTypes from "prop-types"
import React, { Fragment, useCallback, useEffect, useState } from "react"
import SearchResults from "@components/searchResults"
import store from "@store"

const Artist: React.FunctionComponent = (props) => {
	const router = useRouter()
	const { username } = router.query

	const { error, loading, user } = props
	const { createdAt, id, img, memeCount, memes, name, templateCount, templates } = user

	const [active, setActive] = useState(true)
	const [activeItem, setActiveItem] = useState("memes")
	const [bearer, setBearer] = useState(null)
	const [currentUser, setCurrentUser] = useState({})

	useEffect(() => {
		if (typeof username !== "undefined") {
			props.getUser({ username })
		}
	}, [username])

	useEffect(() => {
		const userData = parseJwt()
		if (userData) {
			setBearer(localStorage.getItem("jwtToken"))
			setCurrentUser(userData)
		}
	}, [bearer])

	const onDrop = useCallback(
		(files) => {
			if (files.length > 0) {
				props.changeProfilePic({
					bearer,
					file: files[0]
				})
			}
		},
		[bearer]
	)

	const { getRootProps, getInputProps } = useDropzone({ onDrop })

	let results = memes
	if (activeItem === "templates") {
		results = templates
	}

	const ProfilePic = () => {
		const src = img === null || img === "" ? DefaultPic : `${s3BaseUrl}${img}`
		const content = (
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				<Header>Change your pic</Header>
				<Button className="changePicBtn" color="blue" icon>
					<Icon name="image" />
				</Button>
			</div>
		)

		if (currentUser.id === id) {
			return (
				<Dimmer.Dimmable
					as={Image}
					className="profilePic"
					dimmed={active}
					dimmer={{ active, content, inverted: true }}
					onError={(i) => (i.target.src = DefaultPic)}
					onMouseEnter={() => setActive(true)}
					onMouseLeave={() => setActive(false)}
					src={src}
				/>
			)
		}

		return <Image fluid onError={(i) => (i.target.src = DefaultPic)} src={src} />
	}

	return (
		<Provider store={store}>
			<DefaultLayout
				containerClassName="artistPage"
				seo={{
					description: `${name}'s profile on Brandy`,
					image: {
						height: 200,
						src: "",
						width: 200
					},
					title: name,
					url: `artists/${username}`
				}}
				showFooter={false}
			>
				<Fragment>
					<Grid>
						<Grid.Row>
							<Grid.Column width={4}>
								{loading ? (
									<Placeholder>
										<Placeholder.Image square />
									</Placeholder>
								) : (
									ProfilePic()
								)}
							</Grid.Column>
							<Grid.Column width={12}>
								{!loading && (
									<Fragment>
										<Header as="h1">
											{name}
											<Header.Subheader>
												Joined <Moment date={createdAt} fromNow />
											</Header.Subheader>
										</Header>
										<List className="artistProfileList" horizontal size="big">
											<List.Item onClick={() => setActiveItem("memes")}>
												<b>{memeCount}</b> memes
											</List.Item>
											<List.Item onClick={() => setActiveItem("templates")}>
												<b>{templateCount}</b> templates
											</List.Item>
										</List>
									</Fragment>
								)}
							</Grid.Column>
						</Grid.Row>
					</Grid>

					<Divider section />

					<SearchResults
						justImages
						loading={results.loading}
						results={results.results}
						type={activeItem}
					/>
				</Fragment>
			</DefaultLayout>
		</Provider>
	)
}

Artist.propTypes = {
	changeProfilePic: PropTypes.func,
	error: PropTypes.bool,
	getUser: PropTypes.func,
	loading: PropTypes.bool,
	user: PropTypes.shape({
		createdAt: PropTypes.string,
		id: PropTypes.number,
		img: PropTypes.string,
		memeCount: PropTypes.number,
		memes: PropTypes.shape({
			loading: PropTypes.bool,
			results: PropTypes.arrayOf(
				PropTypes.oneOfType([
					PropTypes.bool,
					PropTypes.shape({
						caption: PropTypes.string,
						createdAt: PropTypes.string,
						likes: PropTypes.number,
						s3Link: PropTypes.string
					})
				])
			)
		}),
		name: PropTypes.string,
		templateCount: PropTypes.number,
		templates: PropTypes.shape({
			loading: PropTypes.bool,
			results: PropTypes.arrayOf(
				PropTypes.oneOfType([
					PropTypes.bool,
					PropTypes.shape({
						name: PropTypes.number,
						s3Link: PropTypes.string
					})
				])
			)
		}),
		username: PropTypes.string
	})
}

Artist.defaultProps = {
	changeProfilePic,
	getUser
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.user,
	...ownProps
})

export default connect(mapStateToProps, {
	changeProfilePic,
	getUser
})(Artist)
