import { searchArtists, searchMemes, searchTemplates } from "@actions/search"
import { Button, Divider, Image, Item } from "semantic-ui-react"
import { useRouter } from "next/router"
import { DebounceInput } from "react-debounce-input"
import { Provider, connect } from "react-redux"
import DefaultLayout from "@layouts/default"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import SearchResults from "@components/searchResults"
import UsersList from "@components/usersList"
import store from "@store"

const Explore: React.FunctionComponent = (props) => {
	const router = useRouter()
	const { q, type } = router.query

	const { artists, memes, templates } = props

	const types = ["artists", "memes", "templates"]
	const defaultType = types.includes(type) ? type : "memes"

	const [activeItem, setActiveItem] = useState(defaultType)
	const [searchVal, setSearchVal] = useState(q)

	useEffect(() => {
		if (typeof type !== "undefined") {
			setActiveItem(type)

			if (type === "artists") {
				props.searchArtists({ q })
			}

			if (type === "memes") {
				props.searchMemes({ q })
			}

			if (type === "templates") {
				props.searchTemplates({ q })
			}
		}

		setSearchVal(q)
	}, [q, type])

	const onClickItem = (name) => {
		setActiveItem(name)

		if (name === "artists") {
			props.searchArtists({ q })
		}

		if (name === "memes") {
			props.searchMemes({ q })
		}

		if (name === "templates") {
			props.searchTemplates({ q })
		}
	}

	const searchForResults = (e) => {
		const q = e.target.value
		setSearchVal(q)

		if (activeItem === "artists") {
			props.searchArtists({ q })
		}

		if (activeItem === "memes") {
			props.searchMemes({ q })
		}

		if (activeItem === "templates") {
			props.searchTemplates({ q })
		}
	}

	let results = memes
	if (activeItem === "artists") {
		results = artists
	}
	if (activeItem === "templates") {
		results = templates
	}

	return (
		<Provider store={store}>
			<DefaultLayout
				containerClassName="explorePage"
				seo={{
					description: "Find memes, templates, and artists on Brandy",
					image: {
						height: 200,
						src: "",
						width: 200
					},
					title: `Search for ${activeItem}`,
					url: ""
				}}
				showFooter={false}
			>
				<div className="ui icon input fluid big">
					<DebounceInput
						debounceTimeout={300}
						minLength={2}
						onChange={searchForResults}
						placeholder="Search..."
						value={searchVal}
					/>
					<i aria-hidden="true" className="search icon" />
				</div>

				<Divider hidden />

				<Button.Group className="exploreFilterBtnGroup" widths={3}>
					<Button
						className={activeItem === "memes" ? "active" : ""}
						color="blue"
						content="Memes"
						fluid
						onClick={() => onClickItem("memes")}
						size="big"
					/>
					<Button
						className={activeItem === "templates" ? "active" : ""}
						color="yellow"
						content="Templates"
						fluid
						onClick={() => onClickItem("templates")}
						size="big"
					/>
					<Button
						className={activeItem === "artists" ? "active" : ""}
						color="violet"
						content="Artists"
						fluid
						onClick={() => onClickItem("artists")}
						size="big"
					/>
				</Button.Group>

				<Divider section />

				{activeItem === "artists" ? (
					<UsersList loading={results.loading} results={results.results} />
				) : (
					<SearchResults
						justImages={activeItem === "templates"}
						loading={results.loading}
						results={results.results}
						type={activeItem}
					/>
				)}
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
					createdAt: PropTypes.string,
					img: PropTypes.string,
					memeCount: PropTypes.number,
					name: PropTypes.string,
					templateCount: PropTypes.number,
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
					createdBy: PropTypes.number,
					id: PropTypes.number,
					likes: PropTypes.number,
					name: PropTypes.string,
					s3Link: PropTypes.string,
					userImg: PropTypes.string,
					userName: PropTypes.string,
					username: PropTypes.string,
					views: PropTypes.number
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
	artists: {
		loading: true,
		results: [false, false, false, false, false, false]
	},
	memes: {
		loading: true,
		results: [false, false, false, false, false, false]
	},
	searchArtists,
	searchMemes,
	searchTemplates,
	templates: {
		loading: true,
		results: [false, false, false, false, false, false]
	}
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
