import { getMeme } from "@actions/meme"
import { Grid, Header, Image, List, Placeholder } from "semantic-ui-react"
import { useRouter } from "next/router"
import { Provider, connect } from "react-redux"
import { withApollo } from "@lib/apollo"
import DefaultLayout from "@layouts/default"
import PropTypes from "prop-types"
import React, { Fragment, useEffect, useState } from "react"
import store from "@store"

const Meme: React.FunctionComponent = ({ getMeme, meme }) => {
	const { error, errorMsg, loading } = meme

	const router = useRouter()
	const { slug } = router.query

	useEffect(() => {
		getMeme({ id: slug })
	}, [])

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
			>
				<Fragment>
					<Grid>
						<Grid.Row>
							<Grid.Column width={11}>
								{loading ? (
									<Placeholder>
										<Placeholder.Image square />
									</Placeholder>
								) : (
									<Image />
								)}
							</Grid.Column>
							<Grid.Column width={5}></Grid.Column>
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
		error: PropTypes.bool,
		errorMsg: PropTypes.string,
		loading: PropTypes.bool
	})
}

Meme.defaultProps = {
	getMeme,
	meme: {}
}

// export default Meme
// export default withApollo({ ssr: true })(Meme)

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.meme,
	...ownProps
})

export default connect(mapStateToProps, {
	getMeme
})(Meme)
