import { getTemplate } from "@actions/template"
import { Container, Header, Image } from "semantic-ui-react"
import { parseJwt } from "@utils/tokenFunctions"
import { Provider, connect } from "react-redux"
import { useRouter } from "next/router"
import DefaultLayout from "@layouts/default"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import store from "@store"

const Template: React.FunctionComponent = (props) => {
	const router = useRouter()
	const { slug } = router.query

	const [currentUser, setCurrentUser] = useState({})

	const { getTemplate, template } = props

	useEffect(() => {
		const userData = parseJwt()
		if (userData) {
			setCurrentUser(userData)
		}

		if (typeof slug !== "undefined") {
			getTemplate({ id: slug })
		}
	}, [slug])

	return (
		<Provider store={store}>
			<DefaultLayout
				containerClassName="templatePage"
				seo={{
					description: "",
					image: {
						height: 200,
						src: "",
						width: 200
					},
					title: "Template",
					url: ""
				}}
				showFooter={false}
			>
				<div className="templatePageHero">
					<Image src={template.data.s3Link} />
				</div>
			</DefaultLayout>
		</Provider>
	)
}

Template.propTypes = {
	getTemplate: PropTypes.func,
	template: PropTypes.shape({
		data: PropTypes.shape({
			createdAt: PropTypes.string,
			name: PropTypes.string,
			s3Link: PropTypes.string,
			user: PropTypes.shape({
				id: PropTypes.number,
				img: PropTypes.string,
				name: PropTypes.string,
				username: PropTypes.string
			})
		}),
		error: PropTypes.bool,
		errorMsg: PropTypes.string,
		loading: PropTypes.bool
	})
}

Template.defaultProps = {
	getTemplate,
	template: {
		data: {
			user: {}
		}
	}
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.template,
	...ownProps
})

export default connect(mapStateToProps, {
	getTemplate
})(Template)
