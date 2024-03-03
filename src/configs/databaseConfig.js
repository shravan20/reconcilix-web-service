const { Sequelize } = require("sequelize");
const databaseConfig = require("./environmentConfigs").databaseConfig;

const sequelize = new Sequelize.Sequelize(
	databaseConfig.name,
	databaseConfig.username,
	databaseConfig.password,
	{
		host: databaseConfig.host,
		dialect: databaseConfig.dialect,
	},
);

const combineModels = () => {
	const models = require("../apis/models/contact");
};

const connect = async () => {
	await sequelize
		.authenticate()
		.then(() => {
			console.log("Connection has been established successfully.");
		})
		.catch((error) => {
			console.error("Unable to connect to the database: ", error);
		});
	combineModels();
};

connect();

module.exports = sequelize;
