const Contact = require("../models/Contact");
const { Op } = require("sequelize");

const contactRepository = {
	getAll: async (query) => {
		try {
			return await Contact.findAll(query);
		} catch (error) {
			throw error;
		}
	},

	getById: async (id) => {
		try {
			const contact = await Contact.findByPk(id);
			return contact;
		} catch (error) {
			throw error;
		}
	},

	create: async (data) => {
		try {
			return await Contact.create(data);
		} catch (error) {
			throw error;
		}
	},

	save: async (data) => {
		try {
			return await data.save();
		} catch (error) {
			throw error;
		}
	},

	update: async (id, data) => {
		try {
			const contact = await Contact.findByPk(id);
			if (!contact) {
				throw new Error("Contact not found");
			}
			await contact.update(data);
			return contact;
		} catch (error) {
			throw error;
		}
	},

	delete: async (id) => {
		try {
			const contact = await Contact.findByPk(id);
			if (!contact) {
				throw new Error("Contact not found");
			}
			await contact.destroy();
			return true;
		} catch (error) {
			throw error;
		}
	},

	findByEmailOrPhoneNumberAndLinkedPrecedence: async (
		email,
		phoneNumber,
		linkPrecedence,
	) => {
		let where = [];
		if (email) {
			where = [...where, { email }];
		}

		if (phoneNumber) {
			where = [...where, { phoneNumber }];
		}

		if (linkPrecedence) {
			where = [...where, { linkPrecedence }];
		}

		let query = {
			where: {
				[Op.or]: where,
			},
			include: [{ model: Contact, as: "linkedContact" }],
		};

		return await Contact.findOne(query);
	},
};

module.exports = contactRepository;
