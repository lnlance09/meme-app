import { getUser } from "@actions/user"
import { Divider, Grid, Header, Image, List, Placeholder } from "semantic-ui-react"
import { useRouter } from "next/router"
import { Provider, connect } from "react-redux"
import DefaultLayout from "@layouts/default"
import DefaultPic from "@public/images/avatar/large/steve.jpg"
import Moment from "react-moment"
import PropTypes from "prop-types"
import React, { Fragment, useEffect, useState } from "react"
import SearchResults from "@components/searchResults"
import store from "@store"

const s3BaseUrl = `https://brandywine22.s3-us-west-2.amazonaws.com/`

const Artist: React.FunctionComponent = (props) => {
	const router = useRouter()
	const { username } = router.query

	const { error, loading, user } = props
	const { createdAt, id, img, memeCount, memes, name, templateCount, templates } = user

	const [activeItem, setActiveItem] = useState("memes")

	useEffect(() => {
		if (typeof username !== "undefined") {
			props.getUser({ username })
		}
	}, [username])

	let results = memes
	if (activeItem === "templates") {
		results = templates
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
					url: ""
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
									<Image
										fluid
										onError={(i) => (i.target.src = DefaultPic)}
										src={img === null ? DefaultPic : `${s3BaseUrl}${img}`}
									/>
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
	getUser
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.user,
	...ownProps
})

export default connect(mapStateToProps, {
	getUser
})(Artist)
