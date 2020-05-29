import { searchArtists, searchMemes, searchTemplates } from "@actions/search"
import { Divider, Header, Menu } from "semantic-ui-react"
import { DebounceInput } from "react-debounce-input"
import { Provider, connect } from "react-redux"
import DefaultLayout from "@layouts/default"
import PropTypes from "prop-types"
import React, { useState } from "react"
import store from "@store"

const Explore: React.FunctionComponent = (props) => {
	const [activeItem, setActiveItem] = useState("memes")
	const [searchVal, setSearchVal] = useState("")

	return (
		<Provider store={store}>
			<DefaultLayout
				seo={{
					description: "",
					image: {
						height: 200,
						src: "",
						width: 200
					},
					title: "",
					url: ""
				}}
			>
				<Header as="h1" content="Explore" size="huge" />
				<div className="ui icon input fluid big">
					<DebounceInput
						debounceTimeout={300}
						minLength={2}
						onChange={(e) => setSearchVal(e.target.value)}
						placeholder="Search..."
						value={searchVal}
					/>
					<i aria-hidden="true" className="search icon" />
				</div>

				<Divider hidden />

				<Menu pointing secondary size="huge">
					<Menu.Item
						active={activeItem === "memes"}
						name="memes"
						onClick={(e, { name }) => setActiveItem(name)}
					/>
					<Menu.Item
						active={activeItem === "templates"}
						name="templates"
						onClick={(e, { name }) => setActiveItem(name)}
					/>
					<Menu.Item
						active={activeItem === "artists"}
						name="artists"
						onClick={(e, { name }) => setActiveItem(name)}
					/>
				</Menu>
			</DefaultLayout>
		</Provider>
	)
}

Explore.propTypes = {
	artists: PropTypes.shape({
		loading: PropTypes.bool,
		results: PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.bool,
				PropTypes.shape({
					img: PropTypes.string,
					name: PropTypes.string,
					username: PropTypes.string
				})
			])
		)
	}),
	memes: PropTypes.shape({
		loading: PropTypes.bool,
		results: PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.bool,
				PropTypes.shape({
					caption: PropTypes.string,
					createdAt: PropTypes.string,
					likes: PropTypes.number,
					s3Link: PropTypes.string
				})
			])
		)
	}),
	searchArtists: PropTypes.func,
	searchMemes: PropTypes.func,
	searchTemplates: PropTypes.func,
	templates: PropTypes.shape({
		loading: PropTypes.bool,
		results: PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.bool,
				PropTypes.shape({
					name: PropTypes.number,
					s3Link: PropTypes.string
				})
			])
		)
	})
}

Explore.defaultProps = {
	searchArtists,
	searchMemes,
	searchTemplates
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.search,
	...ownProps
})

export default connect(mapStateToProps, {
	searchArtists,
	searchMemes,
	searchTemplates
})(Explore)
