import * as constants from "../constants"
import axios from "axios"

export const getTemplate = ({ id }) => (dispatch) => {
	axios
		.get(`/api/template/${id}`)
		.then(async (response) => {
			const { data } = response
			console.log(response.data)
			dispatch({
				payload: data,
				type: constants.GET_TEMPLATE
			})
		})
		.catch((error) => {
			dispatch({
				type: constants.SET_TEMPLATE_FETCH_ERROR
			})
		})
}
