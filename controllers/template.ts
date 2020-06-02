const Auth = require("../utils/authFunctions.ts")
const Aws = require("../utils/awsFunctions.ts")
const db = require("../models/index.ts")
const axios = require("axios")
const randomize = require("randomatic")
const validator = require("validator")
const Template = db.template
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
	const { img, name } = req.body
	const { authenticated, user } = Auth.parseAuthentication(req)

	if (typeof img === "undefined" || img === "") {
		return res.status(422).send({ error: true, msg: "You must provide an image" })
	}

	let image = img
	const timestamp = new Date().getTime()
	const fileName = `templates/${randomize("aa", 24)}-${timestamp}.png`

	if (validator.isURL(img)) {
		const imageFromUrl = await axios.get(img, { responseType: "arraybuffer" })
		image = Buffer.from(imageFromUrl.data).toString("base64")
	}

	await Aws.uploadToS3(image, fileName)

	Template.create({
		createdBy: authenticated ? user.id : 1,
		name,
		s3Link: fileName
	})
		.then((data) => {
			const { id } = data.dataValues
			return res.status(200).send({
				error: false,
				id,
				msg: "Success"
			})
		})
		.catch((err) => {
			return res.status(500).send({
				error: true,
				msg: err.message || "An error occurred"
			})
		})
}

exports.delete = (req, res) => {}

exports.findAll = (req, res) => {
	const { q } = req.query

	let where = {
		name: {
			[Op.like]: `%${q}%`
		}
	}

	if (typeof q === "undefined" || q === "") {
		where = {}
	}

	Template.findAll({
		required: true,
		attributes: ["id", "name", "s3Link"],
		where,
		raw: true
	})
		.then((templates) => {
			return res.status(200).send({
				error: false,
				templates,
				msg: "Success"
			})
		})
		.catch((err) => {
			return res.status(500).send({
				error: true,
				msg: err.message || "An error occurred"
			})
		})
}

exports.findOne = (req, res) => {
	const { id } = req.params

	Template.findAll({
		required: true,
		attributes: ["name", "s3Link", "user.id", "user.img", "user.name", "user.username"],
		where: {
			id
		},
		raw: true,
		include: [
			{
				model: User,
				required: true,
				attributes: []
			}
		]
	})
		.then((template) => {
			return res.status(200).send({
				error: false,
				msg: "Success",
				template
			})
		})
		.catch((err) => {
			return res.status(500).send({
				error: true,
				msg: err.message || "An error occurred"
			})
		})
}
