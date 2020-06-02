import * as constants from "../constants"

const initial = () => ({
	template: {
		data: {
			user: {}
		}
	}
})

const template = (state = initial(), action) => {
	const { payload } = action

	switch (action.type) {
		case constants.GET_TEMPLATE:
			return {
				...state,
				tempalate: {
					data: payload.template,
					error: false,
					errorMsg: "",
					loading: false
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
