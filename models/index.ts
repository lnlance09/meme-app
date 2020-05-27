const dbConfig = require("../db.config.js")
const Sequelize = require("sequelize")

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

let db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.meme = require("./meme.ts")(sequelize, Sequelize)
db.memeTemplate = require("./memeTemplate.ts")(sequelize, Sequelize)
db.template = require("./template.ts")(sequelize, Sequelize)
db.templateText = require("./templateText.ts")(sequelize, Sequelize)
db.user = require("./user.ts")(sequelize, Sequelize)

module.exports = db
