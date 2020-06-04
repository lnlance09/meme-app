import * as constants from "../constants"

const initial = () => ({
	loading: true,
	user: {
		img: "",
		memes: {
			loading: true,
			results: [false, false, false, false, false, false]
		},
		templates: {
			loading: true,
			results: [false, false, false, false, false, false]
		}
	}
})

const user = (state = initial(), action) => {
	const { payload } = action

	switch (action.type) {
		case constants.CHANGE_PROFILE_PIC:
			return {
				...state,
				user: {
					...state.user,
					img: payload.img
				}
			}

		case constants.GET_USER:
			return {
				...state,
				error: false,
				loading: false,
				user: {
					...state.user,
					createdAt: payload.user.createdAt,
					id: payload.user.id,
					img: payload.user.img,
					memeCount: payload.user.memeCount,
					name: payload.user.name,
					templateCount: payload.user.templateCount,
					username: payload.user.username
				}
			}

		case constants.GET_USER_MEMES:
			return {
				...state,
				user: {
					...state.user,
					memes: {
						loading: false,
						results: payload.memes
					}
				}
			}

		case constants.GET_USER_TEMPLATES:
			return {
				...state,
				user: {
					...state.user,
					templates: {
						loading: false,
						results: payload.templates
					}
				}
			}

		default:
			return state
	}
}

export default user
