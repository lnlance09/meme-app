import { Container } from "semantic-ui-react"
import { Provider, connect } from "react-redux"
import Footer from "@components/footer"
import Head from "next/head"
import Header from "@components/header"
import PropTypes from "prop-types"
import React, { Fragment, useCallback, useEffect, useState } from "react"
import store from "@store"

const Home: React.FunctionComponent = (props) => {
	return (
		<Provider store={store}>
			<div className="homePage">
				<Head>
					<title>Home - Brandy</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Header />

				<Container className="mainContainer"></Container>

				<Footer />
			</div>
		</Provider>
	)
}

Home.propTypes = {}

Home.defaultProps = {}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.meme,
	...ownProps
})

export default connect(mapStateToProps, {})(Home)
