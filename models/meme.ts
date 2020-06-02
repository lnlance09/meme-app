module.exports = (sequelize, Sequelize) => {
	const Meme = sequelize.define(
		"meme",
		{
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				unique: true
			},
			caption: {
				type: Sequelize.TEXT
			},
			createdBy: {
				type: Sequelize.INTEGER
				/*
				references: {
					key: "id",
					model: "users"
				}
				*/
			},
			name: {
				type: Sequelize.CHAR
			},
			s3Link: {
				type: Sequelize.CHAR
			},
			views: {
				type: Sequelize.BIGINT,
				defaultValue: 1
			}
		},
		{
			updatedAt: false
		}
	)

	Meme.associate = (models) => {
		// Meme.hasMany(models.memeTemplate, { as: "memeTemplates", foreignKey: "memeId" })
		Meme.belongsTo(models.user, { foreignKey: "createdBy" })
	}

	return Meme
}
