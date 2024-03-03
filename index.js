const appIntializer = require("./src/app");

appIntializer.listen(3000, () => {
	console.log("Server started on port 3000");
});
