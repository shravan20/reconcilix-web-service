const environment = process.env.NODE_ENV || "development";

if (environment === "development") {
	require("dotenv").config({ path: ".env.development" });
} else if (environment === "production") {
	require("dotenv").config({ path: ".env.production" });
}

module.exports = {
	serviceName: process.env.SERVICE_NAME,
	port: process.env.PORT,
	environmentName: process.env.ENV_NAME,
	databaseConfig: {
		uri: process.env.DATABASE_URL,
		name: process.env.DB_NAME,
		username: process.env.DB_UNAME,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
	},
};
