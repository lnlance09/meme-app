import * as constants from "../constants"
import axios from "axios"
import Router from "next/router"

export const createMeme = ({ caption, images }) => (dispatch) => {
	axios
		.post("/api/meme/create", {
			caption,
			images
		})
		.then(async (response) => {
			const { data } = response
			if (!data.error) {
				Router.push(`/meme/${data.id}`)
			}
		})
		.catch((error) => {
			console.log(error)
		})
}

export const getMeme = ({ id }) => (dispatch) => {
	axios
		.get(`/api/meme/${id}`)
		.then(async (response) => {
			const { data } = response
			console.log(response.data)
			dispatch({
				payload: data,
				type: constants.GET_MEME
			})
		})
		.catch((error) => {
			dispatch({
				type: constants.SET_MEME_FETCH_ERROR
			})
		})
}
