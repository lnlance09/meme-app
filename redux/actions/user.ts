import * as constants from "../constants"
import axios from "axios"

export const getUser = ({ username }) => (dispatch) => {
	axios
		.get(`/api/user/${username}`)
		.then((response) => {
			const { data } = response
			dispatch({
				payload: data,
				type: constants.GET_USER
			})

			const id = data.user.id
			dispatch(getUserMemes({ id }))
			dispatch(getUserTemplates({ id }))
		})
		.catch((error) => {
			dispatch({
				type: constants.SET_USER_FETCH_ERROR
			})
		})
}

export const getUserMemes = ({ id }) => (dispatch) => {
	axios
		.get("/api/meme/search", {
			params: {
				userId: id
			}
		})
		.then((response) => {
			const { data } = response
			dispatch({
				payload: data,
				type: constants.GET_USER_MEMES
			})
		})
		.catch((error) => {
			dispatch({
				type: constants.SET_USER_MEMES_FETCH_ERROR
			})
		})
}

export const getUserTemplates = ({ id }) => (dispatch) => {
	axios
		.get("/api/template/search", {
			userId: id
		})
		.then((response) => {
			const { data } = response
			dispatch({
				payload: data,
				type: constants.GET_USER_TEMPLATES
			})
		})
		.catch((error) => {
			dispatch({
				type: constants.SET_USER_TEMPLATES_FETCH_ERROR
			})
		})
}
