module.exports = (sequelize, Sequelize) => {
	const TemplateText = sequelize.define(
		"templateText",
		{
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				unique: true
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

	TemplateText.associate = (models) => {}

	return TemplateText
}
