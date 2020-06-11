import { getTemplate } from "@actions/template"
import { searchMemes } from "@actions/search"
import {
	Button,
	Container,
	Divider,
	Header,
	Image,
	Placeholder,
	Statistic
} from "semantic-ui-react"
import { s3BaseUrl } from "@options/config"
import { parseJwt } from "@utils/tokenFunctions"
import { Provider, connect } from "react-redux"
import { useRouter } from "next/router"
import { withTheme } from "@redux/ThemeProvider"
import { compose } from "redux"
import DefaultImg from "@public/images/color-bars.png"
import DefaultLayout from "@layouts/default"
import Link from "next/link"
import Moment from "react-moment"
import PropTypes from "prop-types"
import React, { Fragment, useEffect, useState } from "react"
import SearchResults from "@components/searchResults"
import store from "@store"

const Template: React.FunctionComponent = ({
	data,
	error,
	errorMsg,
	getTemplate,
	inverted,
	loading,
	memes,
	searchMemes
}) => {
	const router = useRouter()
	const { slug } = router.query

	const getImage = () => {
		const img = data.s3Link
		return typeof img === "undefined" ? DefaultImg : `${s3BaseUrl}${img}`
	}

	const [currentUser, setCurrentUser] = useState({})

	useEffect(() => {
		const userData = parseJwt()
		if (userData) {
			setCurrentUser(userData)
		}

		if (typeof slug !== "undefined") {
			getTemplate({ id: slug })
			searchMemes({ templateId: slug })
		}
	}, [slug])

	const loadMore = (page, templateId) => {
		return searchMemes({ page, templateId })
	}

	return (
		<Provider store={store}>
			<DefaultLayout
				containerClassName="templatePage"
				seo={{
					description: "",
					image: {
						height: 200,
						src: "",
						width: 200
					},
					title: "Template",
					url: `templates/${slug}`
				}}
				showFooter={false}
			>
				<div className={`templatePageHero ${inverted ? "inverted" : ""}`}>
					<Container>
						{loading ? (
							<Placeholder fluid inverted={inverted}>
								<Placeholder.Image square />
							</Placeholder>
						) : (
							<Image
								centered
								onError={(i) => (i.target.src = DefaultImg)}
								src={getImage()}
							/>
						)}
					</Container>
				</div>

				<Container textAlign="center">
					{!loading && (
						<Fragment>
							<Header as="h1" inverted={inverted}>
								{data.name === null ? "Untitled Template" : data.name}
								<Header.Subheader>
									<Moment date={data.createdAt} fromNow /> •{" "}
									<Link href={`/artists/${data.user.username}`}>
										<a>@{data.user.username}</a>
									</Link>
								</Header.Subheader>
							</Header>

							<div style={{ marginBottom: "24px" }}>
								<Statistic inverted={inverted}>
									<Statistic.Value>{data.memeCount}</Statistic.Value>
									<Statistic.Label>Memes Made</Statistic.Label>
								</Statistic>
							</div>

							<Button
								color="blue"
								content="Use this template"
								inverted={inverted}
								size="big"
							/>
						</Fragment>
					)}

					<Divider horizontal inverted={inverted} section>
						Featured in
					</Divider>

					<SearchResults
						hasMore={memes.hasMore}
						justImages
						inverted={inverted}
						loading={memes.loading}
						loadMore={({ page, templateId }) => loadMore(page, templateId)}
						page={memes.page}
						results={memes.results}
						type="memes"
						templateId={slug}
					/>
				</Container>
			</DefaultLayout>
		</Provider>
	)
}

Template.propTypes = {
	getTemplate: PropTypes.func,
	data: PropTypes.shape({
		createdAt: PropTypes.string,
		memeCount: PropTypes.number,
		name: PropTypes.string,
		s3Link: PropTypes.string,
		user: PropTypes.shape({
			id: PropTypes.number,
			img: PropTypes.string,
			name: PropTypes.string,
			username: PropTypes.string
		})
	}),
	error: PropTypes.bool,
	errorMsg: PropTypes.string,
	loading: PropTypes.bool,
	memes: PropTypes.shape({
		hasMore: PropTypes.bool,
		loading: PropTypes.bool,
		page: PropTypes.number,
		results: PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.bool,
				PropTypes.shape({
					caption: PropTypes.string,
					createdAt: PropTypes.string,
					createdBy: PropTypes.number,
					id: PropTypes.number,
					likes: PropTypes.number,
					name: PropTypes.string,
					s3Link: PropTypes.string,
					userImg: PropTypes.string,
					userName: PropTypes.string,
					username: PropTypes.string,
					views: PropTypes.number
				})
			])
		)
	}),
	searchMemes: PropTypes.func
}

Template.defaultProps = {
	getTemplate,
	data: {
		user: {}
	},
	memes: {
		loading: true,
		results: [false, false, false, false, false, false]
	},
	searchMemes
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.template,
	...ownProps
})

export default compose(
	connect(mapStateToProps, {
		getTemplate,
		searchMemes
	}),
	withTheme("dark")
)(Template)
