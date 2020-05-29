import { useCookies } from "react-cookie"
import { Button, Header } from "semantic-ui-react"
import DefaultLayout from "@layouts/default"
import Link from "next/link"
import PropTypes from "prop-types"
import React, { useState } from "react"

const NotFoundPage: React.FunctionComponent = (props) => {
	return (
		<DefaultLayout
			containerClassName="404Page"
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
		></DefaultLayout>
	)
}

NotFoundPage.propTypes = {}

NotFoundPage.defaultProps = {}

export default NotFoundPage
