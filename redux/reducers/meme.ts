import * as constants from "../constants"
import update from "react-addons-update"

const initial = () => ({
	images: [
		{
			active: true,
			img: "",
			texts: [
				{
					activeDrags: 0,
					color: "#000000",
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
