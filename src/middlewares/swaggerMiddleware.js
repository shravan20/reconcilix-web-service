const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
let routePath = path.resolve("src/apis/routes/*.*.js");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Reconcilix Web Service",
			version: "1.0.0",
		},
	},
	apis: [routePath],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
	console.log(routePath);
	app.use(
		"/docs",
		swaggerUi.serve,
		swaggerUi.setup(specs, {
			explorer: true,
		}),
	);
};
