import { searchMemes } from "@actions/search"
import { Button, Container, Divider, Header } from "semantic-ui-react"
import { Provider, connect } from "react-redux"
import DefaultLayout from "@layouts/default"
import Link from "next/link"
import PropTypes from "prop-types"
import React, { useEffect } from "react"
import SearchResults from "@components/searchResults"
import store from "@store"

const Home: React.FunctionComponent = (props) => {
	const { memes } = props

	useEffect(() => {
		props.searchMemes({})
	}, [])

	return (
		<Provider store={store}>
			<DefaultLayout
				containerClassName="homePage"
				seo={{
					description: "",
					image: {
						height: 200,
						src: "",
						width: 200
					},
					title: "Home",
					url: ""
				}}
				showFooter={false}
			>
				<div className="homePageHeroImage">
					<Header as="h1" className="heroHeader" textAlign="center">
						Memes for the masses
						<Header.Subheader>
							<Link href="/create">
								<a>
									<Button
										color="blue"
										content="Create"
										size="big"
										style={{ marginTop: "14px" }}
									/>
								</a>
							</Link>
						</Header.Subheader>
					</Header>
				</div>
				<Divider hidden section />
				<Container>
					<SearchResults loading={memes.loading} results={memes.results} type="memes" />
				</Container>
				<Divider hidden section />
			</DefaultLayout>
		</Provider>
	)
}

Home.propTypes = {
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

Home.defaultProps = {
	memes: {
		loading: true,
		results: [false, false, false, false, false, false]
	},
	searchMemes
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.search,
	...ownProps
})

export default connect(mapStateToProps, { searchMemes })(Home)
