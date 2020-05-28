import { Divider, Grid, Header, Image, List, Placeholder } from "semantic-ui-react"
import { Provider, connect } from "react-redux"
import DefaultLayout from "@layouts/default"
import PropTypes from "prop-types"
import React, { Fragment, useState } from "react"
import SearchResults from "@components/searchResults"
import store from "@store"

const Artist: React.FunctionComponent = (props) => {
	const { memes, templates } = props

	const [loading, setLoading] = useState(true)

	return (
		<Provider store={store}>
			<DefaultLayout
				containerClassName="artistPage"
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
				<Fragment>
					<Grid>
						<Grid.Row>
							<Grid.Column width={5}>
								{loading ? (
									<Placeholder>
										<Placeholder.Image square />
									</Placeholder>
								) : (
									<Image />
								)}
							</Grid.Column>
							<Grid.Column width={11}>
								<Header as="h1" content="Barack Obama" />
								<List horizontal size="big">
									<List.Item>23 memes</List.Item>
									<List.Item>23 templates</List.Item>
								</List>
							</Grid.Column>
						</Grid.Row>
					</Grid>

					<Divider section />

					<SearchResults loading results={memes.results} type="memes" />
				</Fragment>
			</DefaultLayout>
		</Provider>
	)
}

Artist.propTypes = {
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
	})
}

Artist.defaultProps = {}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.user,
	...ownProps
})

export default connect(mapStateToProps, {})(Artist)
