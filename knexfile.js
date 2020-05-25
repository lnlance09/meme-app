module.exports = {
	development: {
		client: "mysql",
		connection: "mysql://localhost:3306/blather_react",
		migrations: {
			tableName: "knex_migrations"
		}
	},
	production: {
		client: "mysql",
		connection: process.env.PG_CONNECTION_STRING,
		migrations: {
			tableName: "knex_migrations"
		}
	}
}
