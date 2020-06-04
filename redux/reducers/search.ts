import * as constants from "../constants"

const initial = () => ({
	artists: {
		loading: true,
		results: [false, false, false, false, false]
	},
	memes: {
		loading: true,
		results: [false, false, false, false, false]
	},
	templates: {
		loading: true,
		results: [false, false, false, false, false]
	}
})

const search = (state = initial(), action) => {
	const { payload } = action

	switch (action.type) {
		case constants.SEARCH_ARTISTS:
			return {
				...state,
				artists: {
					loading: false,
					results: payload.users
				}
			}

		case constants.SEARCH_MEMES:
			return {
				...state,
				memes: {
					loading: false,
					results: payload.memes
				}
			}

		case constants.SEARCH_TEMPLATES:
			return {
				...state,
				templates: {
					loading: false,
					results: payload.templates
				}
			}

		default:
			return state
	}
}

export default search
