const { DataTypes } = require("sequelize");
const sequelize = require("./index").sequelize; // Assuming you have a Sequelize instance already initialized

const Contact = sequelize.define("Contact", {
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

Contact
	.sync({ force: false })
	.then(() => console.log("Contact Model Synced"))
	.catch((err) => console.log("Error in Contact Model Syncing: ", err));

module.exports = Contact;
