module.exports = (sequelize, Sequelize) => {
	const TemplateText = sequelize.define(
		"templateText",
		{
			id: {
				type: Sequelize.INTEGER,
				unique: true,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			fontColor: {
				type: Sequelize.CHAR
			},
			fontFamily: {
				type: Sequelize.CHAR
			},
			fontSize: {
				type: Sequelize.CHAR
			},
			templateId: {
				type: Sequelize.INTEGER,
				references: {
					model: "templates",
					key: "id"
				}
			},
			text: {
				type: Sequelize.TEXT
			},
			x: {
				type: Sequelize.INTEGER
			},
			y: {
				type: Sequelize.INTEGER
			}
		},
		{
			createdAt: false,
			updatedAt: false
		}
	)

	return TemplateText
}
