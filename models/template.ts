module.exports = (sequelize, Sequelize) => {
	const Template = sequelize.define(
		"template",
		{
			id: {
				type: Sequelize.INTEGER,
				unique: true,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
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
			}
		},
		{
			createdAt: false,
			updatedAt: false
		}
	)

	return Template
}
