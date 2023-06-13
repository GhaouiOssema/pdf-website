const PDF = require('../models/PDF');
const path = require('path');

module.exports = {
	async pdfView(req, res) {
		const filename = req.params.filename;

		try {
			// Retrieve the file path from the database based on the filename
			const pdfDocument = await PDF.findOne({ filename });

			if (!pdfDocument) {
				return res.status(404).send('PDF not found');
			}

			const filePath = path.join(
				__dirname,
				'uploads',
				pdfDocument.filepath
			);
			res.sendFile(filePath);
		} catch (error) {
			console.error('Error retrieving PDF:', error);
			res.status(500).send('Internal Server Error');
		}
	},
};
