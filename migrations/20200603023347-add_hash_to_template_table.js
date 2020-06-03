"use strict"

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn(
					"templates",
					"hash",
					{
						type: Sequelize.STRING
					},
					{
						transaction: t
					}
				)
			])
		})
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.removeColumn("templates", "hash", { transaction: t })
			])
		})
	}
}
