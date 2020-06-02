import { parseJwt } from "@utils/tokenFunctions"
import Authentication from "@components/authentication"
import DefaultLayout from "@layouts/default"
import React, { useEffect } from "react"
import Router from "next/router"

const SignIn: React.FunctionComponent = () => {
	useEffect(() => {
		const userData = parseJwt()
		if (userData) {
			Router.push("/")
		}
	}, [])

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

export default SignIn
