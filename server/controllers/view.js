const PDF = require('../models/PDF');
const path = require('path');

module.exports = {
	async pdfView(req, res) {
		// Retrieve the PDF file based on the provided ID
		const pdfId = req.params.id;
		const filePath = path.join(__dirname, '../upload/', `${pdfId}.pdf`);

		// Send the PDF file to the client
		res.sendFile(filePath);
	},
};
