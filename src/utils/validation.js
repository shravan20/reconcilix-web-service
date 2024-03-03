const { check } = require("express-validator");

module.exports = {
	phoneNumber: (phoneNumber) => {
		var re = /^\+?\d{10,14}$/;
		return re.test(phoneNumber);
	},
	email: (email) => {
		// Regular expression pattern for email validation
		let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	},
	validateIdentifyRequest: () => {
		return [
			check("email").custom((value, { req }) => {
				if (!value && !req.body.phoneNumber) {
					throw new Error("Either email or phone number is required");
				}
				return true;
			}),
			check("phoneNumber").custom((value, { req }) => {
				if (!value && !req.body.email) {
					throw new Error("Phone number or email is required");
				}
				return true;
			}),
		];
	},
};
