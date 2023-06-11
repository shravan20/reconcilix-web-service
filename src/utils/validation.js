module.exports = {
	phoneNumber: (phoneNumber) => {
		let regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		if (regex.test(phoneNumber)) {
			return true;
		} else {
			return false;
		}
	},
	email: (email) => {
		// Regular expression pattern for email validation
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	},
};
