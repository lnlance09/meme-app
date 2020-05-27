import { Header } from "semantic-ui-react"
import { Provider, connect } from "react-redux"
import DefaultLayout from "@layouts/default"
import PropTypes from "prop-types"
import React from "react"
import store from "@store"

const Template: React.FunctionComponent = (props) => {
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
				<div className="homePageHeroImage">
					<Header as="h1" className="heroHeader" textAlign="center">
						Memes for the masses
					</Header>
				</div>
			</DefaultLayout>
		</Provider>
	)
}

Template.propTypes = {}

Template.defaultProps = {}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.template,
	...ownProps
})

export default connect(mapStateToProps, {})(Template)
