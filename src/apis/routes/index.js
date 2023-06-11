const healthRouter = require("./health.route");

module.exports = (app) => {
	app.use("/", healthRouter);
};
