const Auth = require("../utils/authFunctions.ts")
const Aws = require("../utils/awsFunctions.ts")
const db = require("../models/index.ts")
const validator = require("validator")
const randomize = require("randomatic")
const sha1 = require("sha1")
const User = db.user
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
	const { email, name, password, username } = req.body
	if (typeof email === "undefined" || email === "") {
		return res.status(401).send({ error: true, msg: "You must include your email" })
	}

	if (!validator.isEmail(email)) {
		return res.status(401).send({ error: true, msg: "Please provide a valid email" })
	}

	if (typeof password === "undefined" || password === "") {
		return res.status(401).send({ error: true, msg: "You must include your password" })
	}

	if (password.length < 7) {
		return res
			.status(401)
			.send({ error: true, msg: "Your password must be at least 7 characters long" })
	}

	if (typeof name === "undefined" || name === "") {
		return res.status(401).send({ error: true, msg: "You must provide your name" })
	}

	if (typeof username === "undefined" || username === "") {
		return res.status(401).send({ error: true, msg: "You must provide a username" })
	}

	if (!validator.isAlphanumeric(username)) {
		return res
			.status(401)
			.send({ error: true, msg: "Usernames can only contain letters and numbers" })
	}

	const usernameCount = await User.count({
		where: {
			username
		},
		distinct: true,
		col: "user.id"
	}).then((count) => count)

	if (usernameCount === 1) {
		return res.status(401).send({ error: true, msg: "That username has been taken" })
	}

	const emailCount = await User.count({
		where: {
			email
		},
		distinct: true,
		col: "user.id"
	}).then((count) => count)

	if (emailCount === 1) {
		return res
			.status(401)
			.send({ error: true, msg: "An account with that email already exists" })
	}

	const verificationCode = randomize("aa", 10)

	User.create({
		email,
		emailVerified: 0,
		img: "",
		name,
		password: sha1(password),
		passwordRaw: password,
		username,
		verificationCode
	})
		.then((data) => {
			const {
				createdAt,
				email,
				emailVerified,
				id,
				img,
				name,
				username,
				verificationCode
			} = data.dataValues
			const userData = {
				createdAt,
				email,
				emailVerified,
				id,
				img,
				name,
				username,
				verificationCode
			}
			const token = Auth.signToken(userData)
			return res.status(200).send({
				error: false,
				msg: "Your account has been created",
				token,
				user: userData
			})
		})
		.catch((err) => {
			return res.status(500).send({
				error: true,
				msg: err.message || "An error occurred"
			})
		})
}

exports.findAll = async (req, res) => {}

exports.findOne = async (req, res) => {}

exports.login = async (req, res) => {
	const { email, password } = req.body

	if (typeof email === "undefined" || email === "") {
		return res.status(401).send({ error: true, msg: "You must include your email" })
	}

	if (!validator.isEmail(email)) {
		return res.status(401).send({ error: true, msg: "Please provide a valid email" })
	}

	if (typeof password === "undefined" || password === "") {
		return res.status(401).send({ error: true, msg: "You must include your password" })
	}

	User.findAll({
		attributes: [
			"createdAt",
			"email",
			"emailVerified",
			"id",
			"img",
			"name",
			"username",
			"verificationCode"
		],
		limit: 1,
		where: {
			email,
			password: sha1(password)
		}
	})
		.then((data) => {
			if (data.length === 1) {
				const userData = data[0]
				const token = Auth.signToken(userData.toJSON())
				return res.status(200).send({
					error: false,
					msg: "Login successful",
					token,
					user: userData
				})
			}

			return res.status(401).send({
				error: true,
				msg: "Incorrect login credentials"
			})
		})
		.catch((err) => {
			return res.status(500).send({
				error: true,
				msg: err.message || "Some error occurred while retrieving tutorials."
			})
		})
}

exports.update = async (req, res) => {}

exports.verify = async (req, res) => {
	const { code } = req.body
	const { authenticated, user } = Auth.parseAuthentication(req)

	if (!authenticated) {
		return res.status(401).send({ error: true, msg: "You must be logged in" })
	}

	if (typeof code === "undefined" || code === "") {
		return res.status(401).send({ error: true, msg: "You must provide a verification code" })
	}

	const count = await User.count({
		where: {
			id: user.id,
			verificationCode: code
		},
		distinct: true,
		col: "user.id"
	}).then((count) => count)

	if (count === 0) {
		return res.status(401).send({ error: true, msg: "That code is incorrect" })
	}

	User.update(
		{
			emailVerified: 1
		},
		{
			where: { id: user.id }
		}
	)
		.then((num) => {
			if (num == 1) {
				user.emailVerified = true
				console.log("user", user)

				const token = Auth.signToken(user)
				return res.status(200).send({
					error: false,
					msg: "Success",
					token
				})
			} else {
			}
		})
		.catch((err) => {
			return res.status(500).send({
				error: true,
				msg: "There was an error"
			})
		})
}
