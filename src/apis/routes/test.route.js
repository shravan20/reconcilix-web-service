const router = require("express").Router();

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test System
 *     description: To check the system test.
 *     responses:
 *       "200":
 *         description: Send up and running if system test is ok.
 */
router.get("/", (request, response) =>
	response.json({ health: "up", message: "Test is succesful" }),
);

module.exports = router;
