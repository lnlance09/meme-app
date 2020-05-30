const dbConfig = require("../db.config.js")
const Sequelize = require("sequelize")
const Meme = require("./meme.ts")
const MemeTemplate = require("./memeTemplate.ts")
const Template = require("./template.ts")
const TemplateText = require("./templateText.ts")
const User = require("./user.ts")

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
})

let db = {
	meme: Meme(sequelize, Sequelize),
	memeTemplate: MemeTemplate(sequelize, Sequelize),
	template: Template(sequelize, Sequelize),
	templateText: TemplateText(sequelize, Sequelize),
	user: User(sequelize, Sequelize)
}

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db)
	}
})

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
