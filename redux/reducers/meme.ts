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
	]
})

const meme = (state = initial(), action) => {
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

export default meme
