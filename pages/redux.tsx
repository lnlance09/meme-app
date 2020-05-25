import { Container } from "semantic-ui-react"
import { useDispatch } from "react-redux"
import { withRedux } from "@lib/redux"
import useInterval from "@lib/useInterval"
import Footer from "@components/footer"
import Head from "next/head"
import Header from "@components/header"
import React, { useState } from "react"

const ReduxPage = () => {
	// Tick the time every second
	const dispatch = useDispatch()
	useInterval(() => {
		dispatch({
			type: "TICK",
			light: true,
			lastUpdate: Date.now()
		})
	}, 1000)

	return (
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
}

ReduxPage.getInitialProps = ({ reduxStore }) => {
	// Tick the time once, so we'll have a
	// valid time before first render
	const { dispatch } = reduxStore
	dispatch({
		type: "TICK",
		light: typeof window === "object",
		lastUpdate: Date.now()
	})

	return {}
}

export default withRedux(ReduxPage)
