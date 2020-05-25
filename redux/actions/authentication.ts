import * as constants from "../constants"
import { parseJwt, setToken } from "@utils/tokenFunctions"
import jwt from "jsonwebtoken"
import request from "axios"

export const changePassword = ({ bearer, confirmPassword, newPassword, password }) => (
	dispatch
) => {
	request.post(
		`${constants.API_URL}users/changePassword`,
		{
			form: {
				current_password: password,
				new_password: newPassword,
				confirm_password: confirmPassword
			},
			headers: {
				Authorization: bearer
			},
			json: true
		},
		function (err, response, body) {
			dispatch({
				payload: body,
				type: constants.CHANGE_PASSWORD
			})
		}
	)
}

export const changeProfilePic = ({ bearer, file }) => (dispatch) => {
	const fr = new FileReader()
	fr.onload = (event) => {
		request.post(
			`${constants.API_URL}users/changeProfilePic`,
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
	}
	fr.readAsArrayBuffer(file)
}

/*
export const linkTwitter = ({ bearer, secret, token, verifier }) => (dispatch) => {
	request.post(
		`${window.location.origin}/api/twitter/getCredentials`,
		{
			form: {
				oauth_token: token,
				oauth_verifier: verifier
			},
			headers: {
				Authorization: bearer
			},
			json: true
		},
		function (err, response, body) {
			if (!body.error) {
				let token = ""
				if (bearer) {
					let localData = parseJwt()
					localData.twitterAccessSecret = body.user.twitterAccessSecret
					localData.twitterAccessToken = body.user.twitterAccessToken
					localData.twitterUrl = body.user.twitterUrl
					if (body.user.linkedTwitter) {
						localData.linkedTwitter = 1
						localData.twitterDate = body.user.twitterDate
						localData.twitterId = body.user.twitterId
						localData.twitterUsername = body.user.twitterUsername
					}
					token = setToken(localData)
					body.bearer = token

					dispatch({
						payload: body,
						type: constants.LINK_TWITTER_ACCOUNT
					})
					return
				}

				token = setToken(body.user)
				body.bearer = token
				dispatch({
					payload: body,
					type: constants.SET_USER_DATA
				})
			}
		}
	)
}
*/

export const logout = () => (dispatch) => {
	localStorage.removeItem("jwtToken")
	dispatch({
		type: constants.LOGOUT
	})
}

export const removeTwitter = (bearer) => (dispatch) => {
	request.post(
		`${constants.API_URL}twitter/remove`,
		{
			headers: {
				Authorization: bearer
			},
			json: true
		},
		function (err, response, body) {
			if (!body.error) {
				let localData = parseJwt()
				localData.linkedTwitter = false
				localData.twitterAccessSecret = body.twitterAccessSecret
				localData.twitterAccessToken = body.twitterAccessToken
				localData.twitterDate = null
				localData.twitterId = null
				localData.twitterUrl = body.twitterUrl
				localData.twitterUsername = null
				const token = setToken(localData)
				body.bearer = token

				dispatch({
					payload: body,
					type: constants.REMOVE_TWITTER_ACCOUNT
				})
			}
		}
	)
}

export const resetPasswordProps = () => (dispatch) => {
	dispatch({
		type: constants.RESET_PASSWORD_PROPS
	})
}

export const submitLoginForm = ({ email, password }) => (dispatch) => {
	request.post(
		`${constants.API_URL}users/login`,
		{
			form: {
				email,
				password
			},
			json: true
		},
		function (err, response, body) {
			if (!body.error) {
				const token = setToken(body.user)
				body.bearer = token
			}

			dispatch({
				payload: body,
				type: constants.SET_USER_DATA
			})
		}
	)
}

export const submitRegistrationForm = ({ email, name, password, username }) => (dispatch) => {
	request.post(
		`${constants.API_URL}users/register`,
		{
			form: {
				email,
				name,
				password,
				username
			},
			json: true
		},
		function (err, response, body) {
			if (!body.error) {
				const token = jwt.sign({ data: body.user }, "secret", {
					expiresIn: 60 * 60 * 5
				})
				localStorage.setItem("jwtToken", token)
				body.bearer = token
			}

			dispatch({
				payload: body,
				type: constants.SET_USER_DATA
			})
		}
	)
}

export const twitterRequestToken = ({ bearer, reset }) => (dispatch) => {
	request.post(
		`/twitter/requestToken`,
		{
			json: true
		},
		function (err, response, body) {
			if (!body.error) {
				let token = null
				if (!reset) {
					let localData = parseJwt()
					localData.twitterUrl = body.url
					token = setToken(localData)
				}

				dispatch({
					payload: {
						bearer: token,
						twitterAccessSecret: body.secret,
						twitterUrl: body.url
					},
					type: constants.SET_TWITTER_URL
				})
			}
		}
	)
}

export const verifyEmail = ({ code, bearer }) => (dispatch) => {
	request.post(
		`${constants.API_URL}users/verifyEmail`,
		{
			form: {
				code
			},
			headers: {
				Authorization: bearer
			},
			json: true
		},
		function (err, response, body) {
			if (!body.error) {
				setToken(body.user)
			}

			dispatch({
				payload: body,
				type: constants.VERIFY_EMAIL
			})
		}
	)
}
