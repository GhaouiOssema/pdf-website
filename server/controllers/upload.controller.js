const PDF = require('../models/PDF');
module.exports = {
	async uploadPdf(req, res) {
		// Check if a file was uploaded
		if (!req.file) {
			res.status(400).json({ error: 'No file uploaded.' });
			return;
		}

		const { title, publicOrPrivate } = req.body;
		const { filename, path } = req.file;

		// Create a new PDF document
		const newPDF = new PDF({
			filename,
			path,
			title,
			owner: req.body.owner,
			publicOrPrivate,
		});

		try {
			// Save the PDF document to the database
			const savedPDF = await newPDF.save();
			res.status(200).json({ message: 'PDF uploaded successfully.' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Failed to upload PDF.' });
		}
	},
};
