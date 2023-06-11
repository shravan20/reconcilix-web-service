const router = require("express").Router();
const controller = require("../controllers/identify.controller");

/**
 * @swagger
 * /identify:
 *   post:
 *     summary: This API is used to get/add the Identity Reconillation
 *     description: This API is used to get/add the Identity Reconillation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: email of the user.
 *               phoneNumber:
 *                 type: string
 *                 default: 987654210
 *                 description: phoneNumber of the user.
 *     responses:
 *       "200":
 *         description: Returns the data, if there are any data against it.
 *       "201":
 *         description: Creates a new entry and returns success data against it.
 */
router.post("/identify", controller.identify);

module.exports = router;
