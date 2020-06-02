import { Button, Header } from "semantic-ui-react"
import { Provider, connect } from "react-redux"
import DefaultLayout from "@layouts/default"
import Link from "next/link"
import PropTypes from "prop-types"
import React from "react"
import store from "@store"

const Home: React.FunctionComponent = () => {
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
			>
				<div className="homePageHeroImage">
					<Header as="h1" className="heroHeader" textAlign="center">
						Memes for the masses
						<Header.Subheader>
							<Link href="/create">
								<a>
									<Button
										color="yellow"
										content="Get started"
										size="big"
										style={{ marginTop: "14px" }}
									/>
								</a>
							</Link>
						</Header.Subheader>
					</Header>
				</div>
			</DefaultLayout>
		</Provider>
	)
}

Home.propTypes = {}

Home.defaultProps = {}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.home,
	...ownProps
})

export default connect(mapStateToProps, {})(Home)
