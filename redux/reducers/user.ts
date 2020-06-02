import * as constants from "../constants"

const initial = () => ({
	user: {},
	memes: {
		loading: true,
		results: [false, false, false, false, false]
	},
	templates: {
		loading: true,
		results: [false, false, false, false, false]
	}
})

const user = (state = initial(), action) => {
	const { payload } = action

	switch (action.type) {
		case constants.GET_USER:
			if (payload.error) {
				return {
					...state,
					error: true
				}
			}

			return {
				...state,
				error: false,
				loading: false,
				user: {
					archiveCount: payload.user.archive_count,
					bio: payload.user.bio,
					createdAt: payload.user.createdAt,
					emailVerified: payload.user.emailVerified === "1",
					id: parseInt(payload.user.id, 10),
					img: payload.user.img,
					name: payload.user.name,
					username: payload.user.username
				}
			}

		default:
			return state
	}
}

export default user
