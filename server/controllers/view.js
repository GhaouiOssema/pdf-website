const PDF = require('../models/PDF');
const path = require('path');

module.exports = {
	async pdfView(req, res) {
		// Retrieve the filename from the request parameters
		const { filename } = req.params;

		// Implement logic to serve the PDF file or perform any other actions
		// For example:
		res.sendFile(`${__dirname}/upload/${filename}`);
	},
};
