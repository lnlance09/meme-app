import * as constants from "../constants"
import axios from "axios"

export const getUser = ({ username }) => (dispatch) => {
	axios
		.get(`/api/user/${id}`)
		.then(async (response) => {
			const { data } = response
			console.log(response.data)
			dispatch({
				payload: data,
				type: constants.GET_USER
			})
		})
		.catch((error) => {
			dispatch({
				type: constants.SET_USER_FETCH_ERROR
			})
		})
}
