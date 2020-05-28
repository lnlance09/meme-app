import { Container } from "semantic-ui-react"
import Footer from "@components/footer"
import Head from "next/head"
import Header from "@components/header"
import PropTypes from "prop-types"
import React from "react"

const DefaultLayout: React.FunctionComponent = ({
	basicHeader,
	children,
	containerClassName,
	isText,
	seo,
	showFooter,
	textAlign
}) => {
	const { description, image, title, url } = seo

	return (
		<div>
			<Head>
				<meta charset="utf8mb4" />
				<meta
					name="google-site-verification"
					content="bTDbvvxwQikYB9zsfufDiaqgVHMRi4DZ0311nJpngi8"
				/>
				<meta name="msvalidate.01" content="66D65FA622461FB6866BB3F58EBD4CE9" />
				<meta name="viewport" content="width=device-width, user-scalable=0" />
				<meta name="theme-color" content="#000000" />

				<meta property="fb:app_id" content="498572440350555" />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={image.src} />
				<meta property="og:image:height" content={image.height} />
				<meta property="og:image:width" content={image.width} />
				<meta property="og:site_name" content="Blather" />
				<meta property="og:title" content={title} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={url} />

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@blatherio" />
				<meta name="twitter:creator" content="@blatherio" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={image.src} />

				<meta name="description" content={description} />
				<meta name="keywords" content="" />
				<meta name="title" content={title} />

				<link rel="canonical" href={url} />
				<link rel="home" href="" />

				<link rel="icon" href="/favicon.ico" />
				<link rel="shortcut icon" href="/favicon.ico?v=3" />
				<link rel="apple-touch-icon" sizes="128x128" href="/favicon.ico?v=3" />

				<title>Home - Brandy</title>
			</Head>

			<Header basic={basicHeader} />

			<Container
				className={`mainContainer ${containerClassName}`}
				text={isText}
				textAlign={textAlign}
			>
				{children}
			</Container>

			{showFooter && <Footer />}
		</div>
	)
}

DefaultLayout.propTypes = {
	basicHeader: PropTypes.bool,
	containerClassName: PropTypes.string,
	isText: PropTypes.bool,
	seo: PropTypes.shape({
		description: PropTypes.string,
		image: PropTypes.shape({
			height: PropTypes.number,
			src: PropTypes.string,
			width: PropTypes.number
		}),
		title: PropTypes.string,
		url: PropTypes.string
	}),
	showFooter: PropTypes.bool,
	textAlign: PropTypes.string
}

DefaultLayout.defaultProps = {
	basicHeader: false,
	containerClassName: "",
	isText: false,
	seo: {
		image: {}
	},
	showFooter: true,
	textAlign: "left"
}

export default DefaultLayout
