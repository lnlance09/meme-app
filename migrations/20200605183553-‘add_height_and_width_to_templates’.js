"use strict"

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.sequelize.transaction((t) => {
			return Promise.all([
				queryInterface.addColumn(
					"templateTexts",
					"height",
					{
						type: Sequelize.INTEGER
					},
					{
						transaction: t
					}
				),
				queryInterface.addColumn(
					"templateTexts",
					"width",
					{
						type: Sequelize.INTEGER
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
				queryInterface.removeColumn("templateTexts", "height", { transaction: t }),
				queryInterface.removeColumn("templateTexts", "width", { transaction: t })
			])
		})
	}
}
