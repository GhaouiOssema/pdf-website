const PDF = require('../models/PDF');
module.exports = {
	async allPdfs(req, res) {
		try {
			// Fetch all PDF documents from the database
			const pdfs = await PDF.find({}, 'filename path');

			res.status(200).json({ pdfs });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Failed to fetch PDF files.' });
		}
	},
};
