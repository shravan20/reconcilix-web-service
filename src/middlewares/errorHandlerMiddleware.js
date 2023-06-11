/**
 * Define a global error handler middleware
 * TODO: Handle other errors before submission
 **/
const errorHandler = (err, req, res, next) => {
	console.error(err);
	res.status(err.statusCode || 500);
	res.json({
		error: {
			message: err.message || "Internal Server Error",
		},
	});
};

const exceptionHandler = (app) => {
	app.use(errorHandler);
};

module.exports = exceptionHandler;
