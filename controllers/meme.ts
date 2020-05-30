const Auth = require("../utils/authFunctions.ts")
const Aws = require("../utils/awsFunctions.ts")
const db = require("../models/index.ts")
const axios = require("axios")
const Meme = db.meme
const MemeTemplate = db.memeTemplate
const Template = db.template
const TemplateText = db.templateText
const User = db.user
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
	const { caption, images } = req.body
	const { authenticated, user } = Auth.parseAuthentication(req)

	if (typeof images === "undefined") {
		return res.status(422).send({ error: true, msg: "You must include at least one image" })
	}

	if (images.length === 0) {
		return res.status(422).send({ error: true, msg: "You must include at least one image" })
	}

	const meme = await Meme.create({
		caption,
		createdBy: authenticated ? user.id : 1
	})
		.then((data) => {
			const { id } = data.dataValues
			return {
				id
			}
		})
		.catch((err) => {
			return res.status(500).send({
				error: true,
				msg: err.message || "An error occurred"
			})
		})

	const memeId = meme.id

	images.map(async (_img) => {
		const { templateId, texts } = _img
		// console.log("image", img)
		// console.log("texts", texts)

		texts.map(async (text) => {
			TemplateText.create({
				fontColor: text.color,
				fontFamily: text.font,
				fontSize: text.size,
				text: text.text,
				x: text.x,
				y: text.y
			})
				.then((data) => {
					const { id } = data.dataValues
					MemeTemplate.create({
						memeId,
						templateId,
						textId: id
					})
						.then((data) => {})
						.catch((err) => {
							return res.status(500).send({
								error: true,
								msg: err.message || "An error occurred"
							})
						})
				})
				.catch((err) => {
					return res.status(500).send({
						error: true,
						msg: err.message || "An error occurred"
					})
				})
		})
	})

	return res.status(200).send({
		error: false,
		id: memeId,
		msg: "Success"
	})
}

exports.delete = (req, res) => {}

exports.findAll = (req, res) => {}

exports.findOne = async (req, res) => {
	const { id } = req.params

	MemeTemplate.findAll({
		include: [
			{
				model: Meme,
				as: "meme",
				required: true,
				include: [
					{
						model: User,
						as: "user",
						required: true,
						attributes: [
							["img", "userImg"],
							["name", "userName"]
						]
					}
				]
			},
			{
				model: Template,
				as: "template",
				attributes: [
					["name", "templateName"],
					["s3Link", "templateSrc"]
				],
				required: true
			},
			{
				model: TemplateText,
				as: "text",
				required: true
			}
		],
		where: {
			memeId: id
		},
		raw: true
	})
		.then((meme) => {
			if (meme.length === 0) {
				return res.status(404).send({
					error: true,
					msg: "That meme does not exist"
				})
			}

			return res.status(200).send({
				error: false,
				meme,
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
