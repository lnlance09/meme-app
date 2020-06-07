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
import DefaultImg from "@public/images/color-bars.png"
import DefaultLayout from "@layouts/default"
import Link from "next/link"
import Moment from "react-moment"
import PropTypes from "prop-types"
import React, { Fragment, useEffect, useState } from "react"
import SearchResults from "@components/searchResults"
import store from "@store"

const Template: React.FunctionComponent = (props) => {
	const router = useRouter()
	const { slug } = router.query

	const { data, error, errorMsg, getTemplate, loading, memes, searchMemes } = props

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
			searchMemes({})
		}
	}, [slug])

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
				<div className="templatePageHero">
					<Container>
						{loading ? (
							<Placeholder fluid>
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

				<Divider hidden />

				<Container textAlign="center">
					{!loading && (
						<Fragment>
							<Header as="h1">
								{data.name === null ? "Untitled Template" : data.name}
								<Header.Subheader>
									<Moment date={data.createdAt} fromNow /> •{" "}
									<Link href={`/artists/${data.user.username}`}>
										<a>@{data.user.username}</a>
									</Link>
								</Header.Subheader>
							</Header>

							<div style={{ marginBottom: "24px" }}>
								<Statistic>
									<Statistic.Value>{data.memeCount}</Statistic.Value>
									<Statistic.Label>Memes Made</Statistic.Label>
								</Statistic>
							</div>

							<Button color="blue" content="Use this template" size="big" />
						</Fragment>
					)}

					<Divider horizontal section>
						Featured in
					</Divider>

					<SearchResults
						justImages
						loading={memes.loading}
						results={memes.results}
						type="memes"
					/>
				</Container>

				<Divider hidden section />
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
		loading: PropTypes.bool,
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

export default connect(mapStateToProps, {
	getTemplate,
	searchMemes
})(Template)
