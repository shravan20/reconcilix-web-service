const dataAccessLayer = require("../dals/contact.dal");
const { Op } = require("sequelize");

const identify = async (body) => {
	try {
		const email = body.email || null;
		const phoneNumber = body.phoneNumber?.toString() || null;

		let primaryContact =
			await dataAccessLayer.findByEmailOrPhoneNumberAndLinkedPrecedence(
				email,
				phoneNumber,
				null,
			);

		if (primaryContact) {
			/**
			 * Case 2: When Primary exists, where a new secondary is to be added
			 */
			let filter = [];

			// Case to be handled => Change to Secondary to Primary
			if (email && phoneNumber) {
				filter = [{ email }];
			}

			/**
			 * Generic Cases
			 */
			if (email && !phoneNumber) {
				filter = [{ email }];
			}
			if (!email && phoneNumber) {
				filter = [{ phoneNumber }];
			}

			let whereAllSecondaryContacts = {
				[Op.or]: filter,
				linkPrecedence: "secondary",
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
				email &&
				primaryContact.email !== email;

			/**
			 * Add as Secondary only for email/email+phone
			 */
			let secondaryContact;
			if (shouldAddSecondary) {
				secondaryContact = await dataAccessLayer.create({
					email: body.email,
					phoneNumber: body.phoneNumber,
					linkedId: primaryContact.id,
					linkPrecedence: "secondary",
				});
			}

			/**
			 * Update Primary Contact to Secondary only for email/email+phone
			 */
			if (email && phoneNumber) {
				if (phoneNumber == primaryContact.phoneNumber) {
					console.log("----------------------------------");
					console.log(allSecondaryContacts.length);
					console.log("----------------------------------");
					primaryContact.phoneNumber = phoneNumber;
					primaryContact.linkPrecedence = "secondary";
					await dataAccessLayer.save(primaryContact);
					console.log("----------------------------------");
					console.log(primaryContact);
					console.log("----------------------------------");
				}
			}

			/**
			 * Response building logic
			 */
			return await buildReportingResponse(
				email,
				phoneNumber,
				primaryContact,
			);
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
	} catch (error) {
		console.log(error);
	}
};

async function buildReportingResponse(email, phoneNumber, primaryContact) {
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
