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
		case constants.CREATE_MEME:
			return {
				state
			}

		default:
			return state
	}
}

export default search
