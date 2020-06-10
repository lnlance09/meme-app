import { Container, Header, Item, List, Placeholder, Visibility } from "semantic-ui-react"
import { s3BaseUrl } from "@options/config"
import DefaultPic from "@public/images/placeholders/image.png"
import PropTypes from "prop-types"
import React, { useState } from "react"
import Router from "next/router"

const UsersList: React.FunctionComponent = (props) => {
	const { hasMore, loading, loadMore, page, q, results } = props
	const [fetching, setFetching] = useState(false)

	const getUserImage = (img) => {
		return img === null || img === "" ? DefaultPic : `${s3BaseUrl}${img}`
	}

	return (
		<div className="usersList">
			{results.length === 0 && !loading ? (
				<Container textAlign="center">
					<Header size="huge">No results...</Header>
				</Container>
			) : (
				<Visibility
					continuous
					onBottomVisible={async () => {
						if (hasMore && !fetching) {
							setFetching(true)
							await loadMore(page, q)
							setFetching(false)
						}
					}}
				>
					<Item.Group divided relaxed>
						{results.map((user, i) => {
							if (loading) {
								return (
									<Item key={`user${i}`}>
										<Placeholder>
											<Placeholder.Image />
										</Placeholder>
										<Item.Content>
											<Placeholder.Paragraph>
												<Placeholder.Line />
												<Placeholder.Line />
												<Placeholder.Line />
											</Placeholder.Paragraph>
										</Item.Content>
									</Item>
								)
							}

							const img = getUserImage(user.img)
							return (
								<Item
									key={`user${i}`}
									onClick={() => Router.push(`/artists/${user.username}`)}
								>
									<Item.Image
										onError={(i) => (i.target.src = DefaultPic)}
										src={img}
									/>
									<Item.Content>
										<Item.Header as="a">{user.name}</Item.Header>
										<Item.Meta>@{user.username}</Item.Meta>
										<Item.Description>
											<List>
												<List.Item>{user.memeCount} memes</List.Item>
												<List.Item>
													{user.templateCount} templates
												</List.Item>
											</List>
										</Item.Description>
									</Item.Content>
								</Item>
							)
						})}
					</Item.Group>
				</Visibility>
			)}
		</div>
	)
}

UsersList.propTypes = {
	loading: PropTypes.bool,
	results: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.bool,
			PropTypes.shape({
				createdAt: PropTypes.string,
				img: PropTypes.string,
				memeCount: PropTypes.number,
				name: PropTypes.string,
				templateCount: PropTypes.number,
				username: PropTypes.string
			})
		])
	)
}

UsersList.defaultProps = {}

export default UsersList
