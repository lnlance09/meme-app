import { Form, Header, Icon, Image, Search } from "semantic-ui-react"
import _ from "lodash"
import defaultImg from "images/images/image-square.png"
import PropTypes from "prop-types"
import React from "react"

const AutoComplete: React.FunctionComponent = (props) => {
	/*
	fetchResults() {
		return fetch(
			`${window.location.origin}/api/search/basic?q=${this.state.value}&category=${
				props.category ? 1 : 0
			}`,
			{
				json: true
			}
		)
			.then((response) => {
				if (response.ok) {
					response.json().then((data) => {
						this.setState({
							isLoading: false,
							results: data.results
						})
					})
				}
			})
			.catch((err) => console.log(err))
	}

	handleSearchChange = (e, { value }) => {
		const self = this
		this.setState({ isLoading: value.length > 3, value }, () => {
			setTimeout(() => {
				self.fetchResults()
			}, 500)
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.history.push(`/search?q=${this.state.value}`)
	}

	onClick = (e, data) => {
		let link = `/pages/youtube/${data.result.social_media_id}`

		if (data.result.type === "twitter") {
			link = `/pages/twitter/${data.result.username}`
		}

		if (data.result.type === "tag") {
			link = `/tags/${data.result.slug}`
		}

		if (this.props.source === "header") {
			this.props.history.push(link)
		}

		if (this.props.source === "fallacyForm") {
			this.props.onChangeAssignee()
			this.props.selectAssignee({
				id: data.result.social_media_id,
				name: data.result.title,
				type: data.result.type,
				username: data.result.username
			})
			this.setState({ value: data.result.title })
		}
	}

	resetComponent = () =>
		this.setState({
			isLoading: false,
			results: [],
			value: this.props.defaultValue ? this.props.defaultValue : ""
		})

    const { isLoading, results, value } = this.state
    const resultRenderer = ({ description, image, social_media_id, title, type, username }) => {
        return (
            <div className="searchItem">
                {image && (
                    <Image
                        className="dropDownItemPic"
                        onError={(i) => (i.target.src = defaultImg)}
                        rounded={false}
                        src={image}
                    />
                )}
                <Header size="tiny">{title}</Header>
                <span>
                    <Icon className={`${type}Icon`} name={type} />
                </span>
            </div>
        )
    }

    resultRenderer.propTypes = {
        description: PropTypes.string,
        image: PropTypes.string,
        social_media_id: PropTypes.string,
        title: PropTypes.string,
        type: PropTypes.string,
        username: PropTypes.string
    }

    const SearchBar = (props) => (
        <Search
            category={props.category}
            className="navSearch"
            defaultValue={value}
            disabled={props.disabled}
            loading={isLoading}
            minCharacters={4}
            onResultSelect={this.onClick}
            onSearchChange={_.debounce(this.handleSearchChange, 800, {
                leading: true
            })}
            placeholder={props.placeholder}
            results={results}
            resultRenderer={resultRenderer}
        />
    )

    return (
        <div className="autocomplete">
            <div style={{ width: `${props.width}` }}>
                {props.source === "header" && (
                    <Form onSubmit={this.handleSubmit}>{SearchBar(props)}</Form>
                )}
                {props.source === "fallacyForm" && <div>{SearchBar(props)}</div>}
            </div>
        </div>
    )
    */
}

AutoComplete.propTypes = {
	defaultValue: PropTypes.string,
	disabled: PropTypes.bool,
	onChangeAssignee: PropTypes.func,
	placeholder: PropTypes.string,
	selectAssignee: PropTypes.func,
	source: PropTypes.string,
	width: PropTypes.string
}

AutoComplete.defaultProps = {
	category: true,
	disabled: false,
	placeholder: "Search",
	source: "header",
	width: "420px"
}

export default AutoComplete
