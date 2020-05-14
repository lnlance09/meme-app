import Footer from '@components/footer'
import Head from 'next/head'
import Header from '@components/header'
import React, { useState } from 'react'

const Home: React.FunctionComponent = () => (
	<div className="container">
		<Head>
			<title>Create Next App</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Header />

		<main></main>

		<Footer />
	</div>
)

export default Home
