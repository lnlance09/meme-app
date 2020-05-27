import * as constants from "../constants"
import { parseJwt, setToken } from "@utils/tokenFunctions"
import jwt from "jsonwebtoken"
import axios from "axios"

export const changePassword = ({ bearer, confirmPassword, newPassword, password }) => (
	dispatch
) => {
	axios
		.post("/api/user/changePassword", {
			confirmPassword,
			password,
			newPassword
		})
		.then((response) => {
			console.log(response)
			dispatch({
				payload: response,
				type: constants.CHANGE_PASSWORD
			})
		})
		.catch((error) => {
			console.log(error)
		})
}

export const changeProfilePic = ({ bearer, file }) => (dispatch) => {
	const fr = new FileReader()
	fr.onload = (event) => {
		axios
			.post("/api/user/changeProfilePic", {
				confirmPassword,
				password,
				newPassword
			})
			.then((response) => {
				console.log(response)
				dispatch({
					payload: response,
					type: constants.CHANGE_PASSWORD
				})
			})
			.catch((error) => {
				console.log(error)
			})

		/*
		request.post(
			"/api/user/changeProfilePic",
			{
				headers: {
					Authorization: bearer,
					"Content-Type": "multipart/form-data",
					enctype: "multipart/form-data"
				},
				json: true,
				multipart: {
					chunked: false,
					data: [
						{
							"Content-Disposition": `form-data; name="file"; filename="${file.name}"`,
							body: event.target.result
						}
					]
				}
			},
			function (err, response, body) {
				let localData = parseJwt()
				if (!body.error) {
					localData.img = body.img
				}
				const token = setToken(localData)
				body.bearer = token

				dispatch({
					payload: body,
					type: constants.CHANGE_PROFILE_PIC
				})
			}
		)
		*/
	}
	fr.readAsArrayBuffer(file)
}

export const logout = () => (dispatch) => {
	// localStorage.removeItem("jwtToken")
	dispatch({
		type: constants.LOGOUT
	})
}

export const resetPasswordProps = () => (dispatch) => {
	dispatch({
		type: constants.RESET_PASSWORD_PROPS
	})
}

export const submitLoginForm = ({ email, password }) => (dispatch) => {
	axios
		.post("/api/user/login", {
			email,
			password
		})
		.then((response) => {
			console.log(response)
			dispatch({
				payload: response,
				type: constants.SET_USER_DATA
			})
		})
		.catch((error) => {
			console.log(error)
		})
}

export const submitRegistrationForm = ({ email, name, password, username }) => (dispatch) => {
	axios
		.post("/api/user/login", {
			email,
			name,
			password,
			username
		})
		.then((response) => {
			console.log(response)
			dispatch({
				payload: response,
				type: constants.SET_USER_DATA
			})
		})
		.catch((error) => {
			console.log(error)
		})
}

export const verifyEmail = ({ code, bearer }) => (dispatch) => {
	axios
		.post("/api/users/verifyEmail", {
			code
		})
		.then((response) => {
			console.log(response)
			dispatch({
				payload: response,
				type: constants.VERIFY_EMAIL
			})
		})
		.catch((error) => {
			console.log(error)
		})
}
