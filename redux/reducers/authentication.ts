import * as constants from "../constants"
import jwt from "jsonwebtoken"

let authenticated = false
let localData = {}
let verify = false
/*
const token = localStorage.getItem("jwtToken")
jwt.verify(token, "lancebass", (err, decoded) => {
	if (decoded) {
		authenticated = true
		localData = decoded.data
		verify = !localData.emailVerified ? true : false
	}
})
*/

const initial = () => ({
	authenticated,
	// bearer: token,
	data: localData,
	passwordError: false,
	patreonLoading: false,
	verify
})

const user = (state = initial(), action) => {
	switch (action.type) {
		case constants.CHANGE_PASSWORD:
			return {
				...state,
				passwordChangeSuccessful: action.payload.error ? false : true,
				passwordError: action.payload.error ? true : false,
				passwordErrorMsg: action.payload.error
			}

		case constants.CHANGE_PROFILE_PIC:
			return {
				...state,
				data: {
					...state.data,
					img: action.payload.img
				}
			}

		case constants.REMOVE_TWITTER_ACCOUNT:
			return {
				...state,
				bearer: action.payload.bearer,
				data: {
					...state.data,
					linkedTwitter: false,
					twitterAccessSecret: action.payload.twitterAccessSecret,
					twitterAccessToken: action.payload.twitterAccessToken,
					twitterDate: null,
					twitterId: null,
					twitterUrl: action.payload.twitterUrl,
					twitterUsername: null
				}
			}

		case constants.RESET_PASSWORD_PROPS:
			return {
				...state,
				loading: false,
				passwordChangeSuccessful: false,
				passwordError: false,
				passwordErrorMsg: ""
			}

		case constants.SET_TWITTER_URL:
			return {
				...state,
				bearer: action.payload.bearer,
				data: {
					...state.data,
					twitterAccessSecret: action.payload.twitterAccessSecret,
					twitterUrl: action.payload.twitterUrl
				}
			}

		case constants.SET_USER_DATA:
			let authenticated = false
			let loginError = false
			let loginErrorMsg = ""
			let user = {}
			let verify = false

			if (action.payload.error) {
				loginError = true
				loginErrorMsg = action.payload.error
			} else {
				if (!action.payload.user.emailVerified) {
					verify = true
				}

				authenticated = true
				user = {
					bio: action.payload.user.bio,
					dateCreated: action.payload.user.dateCreated,
					email: action.payload.user.email,
					emailVerified: action.payload.user.emailVerified,
					name: action.payload.user.name,
					id: action.payload.user.id,
					img: action.payload.user.img,
					linkedTwitter: action.payload.user.linkedTwitter,
					linkedYoutube: action.payload.user.linkedYoutube,
					patreonUsername: action.payload.user.patreonUsername,
					twitterAccessToken: action.payload.user.twitterAccessToken,
					twitterAccessSecret: action.payload.user.twitterAccessSecret,
					twitterDate: action.payload.user.twitterDate,
					twitterId: action.payload.user.twitterId,
					twitterUrl: action.payload.user.twitterUrl,
					twitterUsername: action.payload.user.twitterUsername,
					username: action.payload.user.username,
					youtubeAccessToken: action.payload.user.youtubeAccessToken,
					youtubeDate: action.payload.user.youtubeDate,
					youtubeId: action.payload.user.youtubeId,
					youtubeRefreshToken: action.payload.user.youtubeRefreshToken,
					youtubeUrl: action.payload.user.youtubeUrl
				}
			}

			return {
				...state,
				authenticated,
				bearer: action.payload.bearer,
				data: user,
				loadingLogin: false,
				loadingRegistration: false,
				loginError,
				loginErrorMsg,
				verify
			}

		case constants.UPDATE_ABOUT:
			return {
				...state,
				bearer: action.payload.bearer,
				data: {
					...state.data,
					bio: action.payload.bio
				}
			}

		case constants.VERIFY_EMAIL:
			return {
				...state,
				data: {
					...state.data,
					emailVerified: !action.payload.error
				},
				loginError: action.payload.error,
				loginErrorMsg: action.payload.error
			}

		default:
			return state
	}
}

export default user
