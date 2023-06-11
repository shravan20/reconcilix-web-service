const service = require("../services/identify.service");
const validate = require("../../utils/validation");

const identify = (request, response, next) => {
	try {
		validateIdentifyRequest(request.body);
		service.identify(request.body);
		response.json(service.identify(request.body));
	} catch (error) {
		throw new Error(error);
	}
};

const validateIdentifyRequest = (body) => {
	let phoneNumber = body.phoneNumber;
	let mail = body.email;
	console.log((phoneNumber ?? false) && (mail ?? false));

	// check null or undefined
	let notNullOrUndefined =
		(phoneNumber ?? mail) !== null && (phoneNumber ?? mail) !== undefined;

	if (!notNullOrUndefined) {
		throw new Error("Bad_Request");
	}

	let isValid = false;
	if (phoneNumber) {
		isValid = validate.phoneNumber(phoneNumber);
		if (!isValid) {
			throw new Error("phoneNumber is not valid format");
		}
	}

	if (mail) {
		isValid = validate.email(mail);
		if (!isValid) {
			throw new Error("email is not valid format");
		}
	}
};

module.exports = { identify };
