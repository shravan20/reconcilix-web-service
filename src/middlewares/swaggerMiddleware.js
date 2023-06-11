const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
let routePath = "../apis/routes/*.js";

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
	app.use(
		"/docs",
		swaggerUi.serve,
		swaggerUi.setup(specs, {
			explorer: true,
			customCssUrl:
				"https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
		}),
	);
};
