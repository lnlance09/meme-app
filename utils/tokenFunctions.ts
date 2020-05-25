import jwt from "jsonwebtoken"

export const parseJwt = () => {
	let localData = false
	jwt.verify(localStorage.getItem("jwtToken"), "lancebass", function (err, decoded) {
		if (decoded) {
			localData = {}
			localData = decoded.data
		}
	})
	return localData
}

export const setToken = (localData) => {
	const token = jwt.sign({ data: localData }, "lancebass", {
		expiresIn: 60 * 60 * 5
	})
	localStorage.setItem("jwtToken", token)
	return token
}
