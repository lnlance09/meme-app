import * as constants from "../constants"

const initial = () => ({
	data: {
		user: {}
	},
	error: false,
	errorMsg: "",
	loading: true,
	memes: {
		loading: true,
		results: [false, false, false, false, false, false]
	}
})

const template = (state = initial(), action) => {
	const { payload } = action

	switch (action.type) {
		case constants.GET_TEMPLATE:
			return {
				...state,
				data: {
					createdAt: payload.template.createdAt,
					memeCount: payload.template.memeCount,
					name: payload.template.templateName,
					s3Link: payload.template.s3Link,
					user: {
						id: payload.template.id,
						img: payload.template.img,
						name: payload.template.name,
						username: payload.template.username
					}
				},
				error: false,
				errorMsg: "",
				loading: false
			}

		case constants.SEARCH_MEMES:
			return {
				...state,
				memes: {
					loading: false,
					results: payload.memes
				}
			}

		case constants.SET_TEMPLATE_FETCH_ERROR:
			return {
				...state,
				teamplate: {
					data: {
						user: {}
					},
					error: true,
					errorMsg: "This template does not exist",
					loading: false
				}
			}

		default:
			return state
	}
}

export default template
