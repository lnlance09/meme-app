import { withApollo } from "@lib/apollo"
import { Container } from "semantic-ui-react"
import Footer from "@components/footer"
import Head from "next/head"
import Header from "@components/header"
import React, { useState } from "react"

const ApolloPage = () => (
	<div className="container">
		<Head>
			<title>Create Next App</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Header />

		<Container className="mainContainer"></Container>

		<Footer />
	</div>
)

export default withApollo(ApolloPage)
