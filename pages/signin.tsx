import { parseJwt } from "@utils/tokenFunctions"
import { withTheme } from "@redux/ThemeProvider"
import { compose } from "redux"
import Authentication from "@components/authentication"
import DefaultLayout from "@layouts/default"
import React, { useEffect } from "react"
import Router from "next/router"

const SignIn: React.FunctionComponent = ({ inverted }) => {
	useEffect(() => {
		const userData = parseJwt()
		if (userData ? userData.emailVerified : false) {
			Router.push("/")
		}
	}, [])

	return (
		<DefaultLayout
			basicHeader
			containerClassName="signInPage"
			isText
			seo={{
				description: "Sign in or sign up with Brandy to start creating memes",
				image: {
					height: 200,
					src: "",
					width: 200
				},
				title: "Sign In",
				url: ""
			}}
			showFooter={false}
			textAlign="center"
		>
			<Authentication inverted={inverted} />
		</DefaultLayout>
	)
}

export default withTheme("dark")(SignIn)
