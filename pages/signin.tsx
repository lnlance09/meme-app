import { Provider, connect } from "react-redux"
import { Container } from "semantic-ui-react"
import Authentication from "@components/authentication"
import Footer from "@components/footer"
import Head from "next/head"
import Header from "@components/header"
import PropTypes from "prop-types"
import React, { useState } from "react"
import store from "@store"

const SignIn: React.FunctionComponent = () => (
	<Provider store={store}>
		<div className="signInPage">
			<Head>
				<title>Sign In</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<Container className="mainContainer" text textAlign="center">
				<Authentication />
			</Container>

			<Footer />
		</div>
	</Provider>
)

SignIn.propTypes = {
	authenticated: PropTypes.bool
}

SignIn.defaultProps = {
	authenticated: false
}

export default SignIn
