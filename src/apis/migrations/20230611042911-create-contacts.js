"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Contacts", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			phoneNumber: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			linkPrecedence: {
				type: Sequelize.ENUM("secondary", "primary"),
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			deletedAt: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			linkedId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "Contacts",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
		});
	},

	async down(queryInterface, Sequelize) {},
};
