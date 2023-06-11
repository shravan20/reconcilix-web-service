const Sequelize = require("sequelize");
const databaseConfig = require("./environmentConfigs").databaseConfig;

const sequelize = new Sequelize(
	databaseConfig.name,
	databaseConfig.username,
	databaseConfig.password,
	{
		host: databaseConfig.host,
		dialect: databaseConfig.dialect,
	},
);

module.exports = {
	connect: () => {
		sequelize
			.authenticate()
			.then(() => {
				console.log("Connection has been established successfully.");
			})
			.catch((error) => {
				console.error("Unable to connect to the database: ", error);
			});
		sequelize.sync({ force: false });
	},
	sequelize: sequelize,
};
