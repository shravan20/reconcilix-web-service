const router = require("express").Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: System Health
 *     description: To check the system health.
 *     responses:
 *       "200":
 *         description: Send up and running if system health is ok.
 */
router.get("/health", (request, response) => response.json({ health: "up" }));

module.exports = router;
