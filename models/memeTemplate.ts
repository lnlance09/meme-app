module.exports = (sequelize, Sequelize) => {
	const MemeTemplate = sequelize.define(
		"memeTemplate",
		{
			id: {
				type: Sequelize.INTEGER,
				unique: true,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			memeId: {
				type: Sequelize.INTEGER,
				references: {
					model: "memes",
					key: "id"
				}
			},
			templateId: {
				type: Sequelize.INTEGER,
				references: {
					model: "templates",
					key: "id"
				}
			}
		},
		{
			createdAt: false,
			updatedAt: false
		}
	)

	return MemeTemplate
}
