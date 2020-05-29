import jwt from "jsonwebtoken"
const secret = "mysuperdupersecret"

export const parseJwt = () => {
	const token = localStorage.getItem("jwtToken")
	const decoded = jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			return false
		}
		return decoded.data
	})
	return decoded
}

export const setToken = (data) => {
	const token = jwt.sign({ data }, secret, {
		expiresIn: 60 * 60 * 5
	})
	localStorage.setItem("jwtToken", token)
	return token
}
