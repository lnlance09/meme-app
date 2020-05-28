import { useCookies } from "react-cookie"
import Authentication from "@components/authentication"
import DefaultLayout from "@layouts/default"
import PropTypes from "prop-types"
import React, { useEffect } from "react"
import Router from "next/router"

const SignIn: React.FunctionComponent = () => {
	const [cookies] = useCookies(["bearer"])

	useEffect(() => {
		console.log("cookies", cookies)
		if (cookies.bearer) {
			Router.push("/")
		}
	})

	return (
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
}

SignIn.propTypes = {
	authenticated: PropTypes.bool
}

SignIn.defaultProps = {
	authenticated: false
}

export default SignIn
