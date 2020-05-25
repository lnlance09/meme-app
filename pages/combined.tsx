import React from "react"
import { Container } from "semantic-ui-react"
import { useDispatch } from "react-redux"
import { compose } from "redux"
import { withRedux } from "@lib/redux"
import { withApollo } from "@lib/apollo"
import useInterval from "@lib/useInterval"
import Footer from "@components/footer"
import Head from "next/head"
import Header from "@components/header"

import Clock from "@components/Clock"
import Counter from "@components/Counter"
import Submit from "@components/Submit"
import PostList from "@components/PostList"

const IndexPage = () => {
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
		<div className="homePage">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<Container className="mainContainer">
				{/* Redux */}
				<Counter />

				{/* Apollo */}
				<Submit />
				<PostList />
			</Container>

			<Footer />
		</div>
	)
}

IndexPage.getInitialProps = ({ reduxStore }) => {
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

export default compose(withApollo, withRedux)(IndexPage)
