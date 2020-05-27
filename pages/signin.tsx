import { Container } from "semantic-ui-react"
import Authentication from "@components/authentication"
import DefaultLayout from "@layouts/default"
import PropTypes from "prop-types"
import React from "react"

const SignIn: React.FunctionComponent = () => (
	<DefaultLayout
		basicHeader
		containerClassName="signInPage"
		isText
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
		textAlign="center"
	>
		<Authentication />
	</DefaultLayout>
)

SignIn.propTypes = {
	authenticated: PropTypes.bool
}

SignIn.defaultProps = {
	authenticated: false
}

export default SignIn
