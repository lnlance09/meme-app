"use strict"

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn(
					"templateTexts",
					"backgroundColor",
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
				queryInterface.removeColumn("templateTexts", "backgroundColor", { transaction: t })
			])
		})
	}
}
