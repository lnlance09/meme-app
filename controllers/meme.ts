const Auth = require("../utils/authFunctions.ts")
const Aws = require("../utils/awsFunctions.ts")
const db = require("../models/index.ts")
const axios = require("axios")
const Meme = db.meme
const MemeTemplate = db.memeTemplate
const Template = db.template
const TemplateText = db.templateText
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
		createdBy: authenticated ? user.id : 3
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

		await MemeTemplate.create({
			memeId,
			templateId
		})
			.then((data) => {})
			.catch((err) => {
				return res.status(500).send({
					error: true,
					msg: err.message || "An error occurred"
				})
			})

		texts.map(async (text) => {
			TemplateText.create({
				fontColor: text.color,
				fontFamily: text.font,
				fontSize: text.size,
				templateId,
				text: text.text,
				x: text.x,
				y: text.y
			})
				.then((data) => {
					return res.status(200).send({
						error: false,
						id: memeId,
						msg: "Success"
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
}

exports.delete = (req, res) => {}

exports.findAll = (req, res) => {}

exports.findOne = async (req, res) => {
	console.log("findOne", req.body)
	const { id } = req.body

	Meme.findAll({
		include: [
			{
				model: MemeTemplate,
				required: true,
				include: [
					{
						model: Template,
						required: true,
						include: [TemplateText]
					}
				]
			}
		],
		where: {
			id
		}
	}).then((memes) => {
		console.log("memes", memes)
	})

	// TemplateText.hasOne(Template, { foreignKey: "templateId" })
	// Template.

	// User.hasMany(Post, {foreignKey: 'user_id'})
	// Post.belongsTo(User, {foreignKey: 'user_id'})
	// Post.find({ where: { ...}, include: [User]})
}
