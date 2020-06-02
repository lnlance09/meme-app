module.exports = (sequelize, Sequelize) => {
	const Template = sequelize.define(
		"template",
		{
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				unique: true
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
			}
		},
		{
			createdAt: false,
			updatedAt: false
		}
	)

	Template.associate = (models) => {
		Template.belongsTo(models.user, { foreignKey: "createdBy" })
	}

	return Template
}
