const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

module.exports = (app) => {
	app.use(morgan("combined"));

	// parse json request body
	app.use(express.json());

	// parse urlencoded request body
	app.use(express.urlencoded({ extended: true }));

	// enable cors
	app.use(cors());
	app.options("*", cors());
};
