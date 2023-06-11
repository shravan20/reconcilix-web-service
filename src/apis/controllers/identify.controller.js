const service = require("../services/identify.service");
const validate = require("../../utils/validation");
const { check, validationResult } = require("express-validator");

const identify = async (request, response, next) => {
	try {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(422).json({ errors: errors.array() });
		}
		let serviceResponse = await service.identify(request.body);
		console.log(123123)
        return response.json(serviceResponse);
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = { identify };
