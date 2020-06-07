import * as constants from "../constants"

const initial = () => ({
	images: [
		{
			active: true,
			img: "/images/blank.png",
			path: null,
			texts: [
				{
					activeDrags: 0,
					backgroundColor: "transparent",
					color: "#0c243c",
					font: "OswaldRegular",
					height: 0,
					size: "32",
					text: "",
					width: 0,
					x: 0,
					y: 10
				}
			]
		}
	],
	meme: {
		data: {
			templates: [],
			user: {}
		},
		error: false,
		errorMsg: "",
		loading: true
	}
})

const meme = (state = initial(), action) => {
	const { payload } = action

	switch (action.type) {
		case constants.GET_MEME:
			return {
				...state,
				meme: {
					data: payload.meme,
					error: false,
					errorMsg: "",
					loading: false
				}
			}

		case constants.RESET_MEME_TO_INITIAL:
			return initial()

		case constants.SET_MEME_FETCH_ERROR:
			return {
				...state,
				meme: {
					data: {
						templates: [],
						user: {}
					},
					error: true,
					errorMsg: "This meme does not exist",
					loading: false
				}
			}

		case constants.UPDATE_MEME:
			return {
				...state,
				meme: {
					...state.meme,
					data: {
						...state.meme.data,
						caption: payload.meme.caption,
						img: payload.meme.img,
						name: payload.meme.name
					}
				}
			}

		case constants.UPDATE_MEME_IMG:
			return {
				...state,
				meme: {
					...state.meme,
					data: {
						...state.meme.data,
						s3Link: payload.s3Link
					}
				}
			}

		default:
			return state
	}
}

export default meme
