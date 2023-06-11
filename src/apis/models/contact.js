const { DataTypes } = require("sequelize");
const sequelizee = require('../../configs/databaseConfig');

const Contact = sequelizee.define("Contact", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	phoneNumber: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	linkPrecedence: {
		type: DataTypes.ENUM("secondary", "primary"),
		allowNull: false,
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	deletedAt: {
		type: DataTypes.DATE,
		allowNull: true,
	},
});

// Self-referential association
Contact.belongsTo(Contact, {
	as: "linkedContact",
	foreignKey: "linkedId",
	constraints: false,
});

Contact.sync();

module.exports = Contact;
