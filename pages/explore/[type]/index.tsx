import { searchArtists, searchMemes, searchTemplates } from "@actions/search"
import { Divider, Image, Button } from "semantic-ui-react"
import { useRouter } from "next/router"
import { DebounceInput } from "react-debounce-input"
import { Provider, connect } from "react-redux"
import DefaultLayout from "@layouts/default"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import SearchResults from "@components/searchResults"
import store from "@store"

const Explore: React.FunctionComponent = (props) => {
	const router = useRouter()
	const { q, type } = router.query

	const { artists, memes, templates } = props

	const [activeItem, setActiveItem] = useState("memes")
	const [searchVal, setSearchVal] = useState(q)

	useEffect(() => {
		if (typeof type !== "undefined") {
			setActiveItem(type)
		}

		setSearchVal(q)

		props.searchArtists({ q })
		props.searchMemes({ q })
		props.searchTemplates({ q })
	}, [q, type])

	const onClickItem = (name) => {
		setActiveItem(name)
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

				<SearchResults
					justImages
					loading={results.loading}
					results={results.results}
					type={activeItem}
				/>
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
		results: [false, false, false, false, false]
	},
	memes: {
		loading: true,
		results: [false, false, false, false, false]
	},
	searchArtists,
	searchMemes,
	searchTemplates,
	templates: {
		loading: true,
		results: [false, false, false, false, false]
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
