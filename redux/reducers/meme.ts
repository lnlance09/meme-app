import * as constants from "../constants"

const initial = () => ({
	images: [
		{
			active: true,
			img: "",
			path: null,
			texts: [
				{
					activeDrags: 0,
					color: "#F3F4F5",
					font: "Arial",
					size: 32,
					text: "",
					x: 0,
					y: 10
				}
			]
		}
	],
	meme: {
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
				meme: payload
			}

		case constants.SET_MEME_FETCH_ERROR:
			return {
				...state,
				meme: {
					error: true,
					errorMsg: "This meme does not exist",
					loading: false
				}
			}

		default:
			return state
	}
}

export default meme
