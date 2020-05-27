module.exports = (sequelize, Sequelize) => {
	const Meme = sequelize.define(
		"meme",
		{
			id: {
				type: Sequelize.INTEGER,
				unique: true,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			caption: {
				type: Sequelize.TEXT
			},
			createdBy: {
				type: Sequelize.INTEGER,
				references: {
					model: "users",
					key: "id"
				}
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

	return Meme
}
