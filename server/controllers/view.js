const PDF = require('../models/PDF');

module.exports = {
	async pdfView(req, res) {
		const filename = req.params.filename;

		try {
			// Find the PDF document with the matching filename in the database
			const pdfDocument = await PDF.findOne({ filename });

			if (!pdfDocument) {
				return res.status(404).send('PDF not found');
			}

			const filePath = pdfDocument.filepath;
			res.sendFile(filePath);
		} catch (error) {
			console.error('Error retrieving PDF:', error);
			res.status(500).send('Internal Server Error');
		}
	},
};
