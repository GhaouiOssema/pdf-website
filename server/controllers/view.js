const fs = require('fs');
const path = require('path');
const PDF = require('../models/PDF');

module.exports = {
	async pdfView(req, res) {
		const { filename } = req.params;

		try {
			// Check if the file ID exists in the database
			const pdf = await PDF.findOne({ filename });

			if (!pdf) {
				// If the file ID does not exist, return a 404 status
				return res.status(404).send('File not found');
			}

			// Assuming the PDF files are stored in a specific directory
			const filePath = path.join(
				__dirname,
				'/uploads/',
				`${filename}.pdf`
			);

			// Check if the file exists in the specified path
			if (fs.existsSync(filePath)) {
				// If the file exists, send the file URL as the response
				const fileURL = `https://pdf-server-809j.onrender.com/uploads/${filename}.pdf`;
				return res.send(fileURL);
			} else {
				// If the file does not exist, return a 404 status
				return res.status(404).send('File not found');
			}
		} catch (error) {
			// Handle any other errors that may occur
			console.error(error);
			return res.status(500).send('Internal Server Error');
		}
	},
};
