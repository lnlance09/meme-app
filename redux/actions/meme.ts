import * as constants from "../constants"
import axios from "axios"

export const createMeme = ({ callback, images }) => (dispatch) => {
	axios
		.post("/api/meme/create", {
			images
		})
		.then((response) => {
			console.log(response)
			dispatch({
				payload: {},
				type: constants.CREATE_MEME
			})
		})
		.catch((error) => {
			console.log(error)
		})
}
