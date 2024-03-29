const express = require("express");
const app = express();
const swaggerMiddleware = require("./middlewares/swaggerMiddleware");
const routerMiddleware = require("./apis/routes/index");
const apiMiddleware = require("./middlewares/apiMiddleware");
const database = require("./configs/databaseConfig");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");
let configs = require("./configs/environmentConfigs");

/**
 * Initialize the app and other functionalities/middlewares required
 */

swaggerMiddleware(app);
apiMiddleware(app);
routerMiddleware(app);
errorHandlerMiddleware(app);

console.log(
	`${configs.serviceName} Server running on ${configs.environmentName} environment`,
);

module.exports = app;
