import * as linkify from "linkifyjs"
import { Card, Image, Placeholder, Visibility } from "semantic-ui-react"
import { baseUrl, s3BaseUrl } from "@options/config"
import DefaultPic from "@public/images/color-bars.jpg"
import hashtag from "linkifyjs/plugins/hashtag"
import Linkify from "linkifyjs/react"
import Moment from "react-moment"
import PropTypes from "prop-types"
import React, { Fragment, useEffect, useState } from "react"
import Router from "next/router"

const MemeCard = ({ loading, title, subtitle, description }) => {
	if (loading) {
		return (
			<Placeholder>
				<Placeholder.Header>
					<Placeholder.Line length="very long" />
					<Placeholder.Line length="long" />
				</Placeholder.Header>
				<Placeholder.Paragraph>
					<Placeholder.Line length="medium" />
				</Placeholder.Paragraph>
			</Placeholder>
		)
	}

	return (
		<Fragment>
			{/*
			<Card.Header>{title}</Card.Header>
			<Card.Meta>{subtitle}</Card.Meta>
			*/}
			<Card.Description>
				<Linkify
					options={{
						formatHref: {
							hashtag: (val) => `${baseUrl}explore/memes?q=${val.substr(1)}`
						}
					}}
				>
					{description}
				</Linkify>
			</Card.Description>
		</Fragment>
	)
}

const SearchResults: React.FunctionComponent = (props) => {
	const { justImages, loading, results, type } = props

	useEffect(() => {
		hashtag(linkify)
	}, [])

	const getCardData = (type, result) => {
		if (type === "memes") {
			return {
				description: result.caption,
				link: `/meme/${result.id}`,
				subtitle: (
					<Fragment>
						<Moment date={result.createdAt} fromNow /> • {result.views} views
					</Fragment>
				),
				title: result.name === null ? `Meme #${result.id}` : result.name
			}
		}

		if (type === "templates") {
			return {
				link: `/template/${result.id}`
			}
		}
	}

	const getCardImage = (s3Link) => {
		return s3Link === null ? DefaultPic : `${s3BaseUrl}${s3Link}`
	}

	return (
		<div className={`searchResults ${type}`}>
			<Card.Group itemsPerRow={3} stackable>
				{results.map((result, i) => {
					const { description, link, subtitle, title } = getCardData(type, result)
					const img = getCardImage(result.s3Link)

					return (
						<Card
							className="searchCard"
							key={`${type}_${i}`}
							onClick={() => Router.push(link)}
						>
							{loading ? (
								<Placeholder>
									<Placeholder.Image square />
								</Placeholder>
							) : (
								<Image
									onError={(i) => (i.target.src = DefaultPic)}
									src={img}
									wrapped
									ui={false}
								/>
							)}

							{!justImages && (
								<Card.Content>
									<MemeCard
										description={description}
										loading={loading}
										subtitle={subtitle}
										title={title}
									/>
								</Card.Content>
							)}
						</Card>
					)
				})}
			</Card.Group>
		</div>
	)
}

SearchResults.propTypes = {
	justImages: PropTypes.bool,
	loading: PropTypes.bool,
	results: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				name: PropTypes.number,
				s3Link: PropTypes.string
			}),
			PropTypes.shape({
				caption: PropTypes.string,
				createdAt: PropTypes.string,
				createdBy: PropTypes.number,
				id: PropTypes.number,
				img: PropTypes.string,
				likes: PropTypes.number,
				name: PropTypes.string,
				s3Link: PropTypes.string,
				templateName: PropTypes.string,
				username: PropTypes.string,
				views: PropTypes.number
			}),
			PropTypes.shape({
				createdAt: PropTypes.string,
				img: PropTypes.string,
				name: PropTypes.string,
				username: PropTypes.string
			})
		])
	),
	type: PropTypes.oneOf(["artists", "memes", "templates"])
}

SearchResults.defaultProps = {}

export default SearchResults
