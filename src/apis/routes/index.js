const healthRouter = require("./health.route");
const testRouter = require("./test.route");
const identifyRouter = require("./identity.route");

module.exports = (app) => {
	app.use("/", healthRouter);
	app.use("/", testRouter);
	app.use("/", identifyRouter);
};
