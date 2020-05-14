import * as constants from "../constants"
import axios from "axios"

export const fetchUserData = ({ bearer, username }) => dispatch => {

}

export const logout = () => dispatch => {
	// localStorage.removeItem("jwtToken")
	dispatch({
		type: constants.LOGOUT
	})
}