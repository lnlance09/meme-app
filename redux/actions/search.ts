import * as constants from "../constants"
import axios from "axios"

export const searchArtists = ({ q }) => (dispatch) => {
	axios
		.get("/api/user/search", {
			q
		})
		.then((response) => {
			const { data } = response
			dispatch({
				payload: data,
				type: constants.SEARCH_ARTISTS
			})
		})
		.catch((error) => {
			console.log(error)
		})
}

export const searchMemes = ({ q }) => (dispatch) => {
	axios
		.get("/api/meme/search", {
			params: {
				q
			}
		})
		.then((response) => {
			const { data } = response
			dispatch({
				payload: data,
				type: constants.SEARCH_MEMES
			})
		})
		.catch((error) => {
			console.log(error)
		})
}

export const searchTemplates = ({ q }) => (dispatch) => {
	axios
		.get("/api/template/search", {
			q
		})
		.then((response) => {
			const { data } = response
			dispatch({
				payload: data,
				type: constants.SEARCH_TEMPLATES
			})
		})
		.catch((error) => {
			console.log(error)
		})
}
