const PDF = require('../models/PDF');
module.exports = {
	async allPdfs(req, res) {
		try {
			// Fetch all PDF documents from the database
			const pdfs = await PDF.find({}, '-__v'); // Exclude the __v field

			res.status(200).json({ pdfs });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Failed to fetch PDF files.' });
		}
	},
};
