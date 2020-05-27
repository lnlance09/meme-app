import { Button, Card, Placeholder, Visibility } from "semantic-ui-react"
import PropTypes from "prop-types"
import React, { Fragment useEffect, useState } from "react"

const MemeCard = ({ loading, image, title, subtitle, description }) => (
    <Fragment>

    </Fragment>
)

const SearchResults: React.FunctionComponent = (props) => {
	const { loading, results } = props

	return (
		<div className="searchResults">
			<Card.Group doubling itemsPerRow={3} stackable>
				{results.map((result, i) => {

                    return (
                        <Card key={card.header}>
                            {loading ? (
                                <Placeholder>
                                    <Placeholder.Image square />
                                </Placeholder>
                            ) : (
                                <Image src={card.avatar} />
                            )}

                            <Card.Content>
                                {loading ? (
                                    <Placeholder>
                                        <Placeholder.Header>
                                            <Placeholder.Line length="very short" />
                                            <Placeholder.Line length="medium" />
                                        </Placeholder.Header>
                                        <Placeholder.Paragraph>
                                            <Placeholder.Line length="short" />
                                        </Placeholder.Paragraph>
                                    </Placeholder>
                                ) : (
                                    <Fragment>
                                        <Card.Header>{card.header}</Card.Header>
                                        <Card.Meta>{card.date}</Card.Meta>
                                        <Card.Description>{card.description}</Card.Description>
                                    </Fragment>
                                )}
                            </Card.Content>
                        </Card>
                    )
                })}
			</Card.Group>
		</div>
	)
}

SearchResults.propTypes = {
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
				likes: PropTypes.number,
				s3Link: PropTypes.string
			}),
			PropTypes.shape({
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
