const dataAccessLayer = require("../dals/contact.dal");
const { Op } = require("sequelize");

const identify = async (body) => {
	const email = body.email;
	const phoneNumber = body.phoneNumber;

	let primaryContact =
		await dataAccessLayer.findByEmailOrPhoneNumberAndLinkPredence(
			email,
			phoneNumber,
			"primary",
		);

	if (primaryContact) {
		let secondaryContact;

		/**
		 * Case 2: When Primary exists, where a new secondary is to be added
		 */
		let filter = [];

		// Case to be handled => Change to Secondary to Primary
		if (email && primaryContact) {
			filter = [{ email }];
		}

		/**
		 * Generic Cases
		 */
		if (email && !primaryContact) {
			filter = [{ email }];
		}
		if (!email && primaryContact) {
			filter = [{ primaryContact }];
		}

		let whereAllSecondaryContacts = {
			[Op.or]: filter,
			linkPrecedence: "secondary",
			linkedId: primaryContact.id,
		};

		// Retrieve linked contacts
		const allSecondaryContacts = await dataAccessLayer.getAll({
			where: whereAllSecondaryContacts,
		});

		/**
		 * This check if the data that has come in has anything new
		 */
		const shouldAddSecondary =
			allSecondaryContacts.length == 0 &&
			((body.email && primaryContact.email !== body.email) ||
				(body.phoneNumber &&
					primaryContact.phoneNumber !== body.phoneNumber));

		if (shouldAddSecondary) {
			secondaryContact = await dataAccessLayer.create({
				email: body.email,
				phoneNumber: body.phoneNumber,
				linkedId: primaryContact.id,
				linkPrecedence: "secondary",
			});
		}

		/**
		 * Response building logic
		 */

		let where = {
			[Op.or]: [{ email }, { phoneNumber }],
			linkPrecedence: "secondary",
			linkedId: primaryContact.id,
		};

		// Retrieve linked contacts
		const secondaryContacts = await dataAccessLayer.getAll({
			where: where,
		});

		// Build response object
		return buildResponseObject(primaryContact, secondaryContacts);
	}

	/**
	 * Case 1: Creating a Primary Contact when doesnt exist
	 */
	let newContact = await dataAccessLayer.create({
		email: body.email,
		phoneNumber: body.phoneNumber,
		linkedId: null,
		linkPrecedence: "primary",
	});

	return {
		contact: {
			primaryContactId: newContact.id,
			emails: [newContact.email],
			phoneNumbers: [newContact.phoneNumber],
			secondaryContactIds: [],
		},
	};
};

function buildResponseObject(existingContact, linkedContacts) {
	let primaryContactId = existingContact.id;
	let emails = linkedContacts.map((c) => c.email).filter(Boolean);
	emails.unshift(existingContact.email);
	let phoneNumbers = linkedContacts.map((c) => c.phoneNumber).filter(Boolean);
	phoneNumbers.unshift(existingContact.phoneNumber);

	const secondaryContactIds = linkedContacts.map((c) => c.id);

	return {
		contact: {
			primaryContactId,
			emails: [...new Set(emails)],
			phoneNumbers: [...new Set(phoneNumbers)],
			secondaryContactIds,
		},
	};
}

module.exports = {
	identify,
};
