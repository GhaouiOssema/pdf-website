const PDF = require('../models/PDF');
module.exports = {
	async onePdf(req, res) {
		try {
			const pdfId = req.params.id;

			// Find the PDF in the database by ID
			const pdf = await PDF.findById(pdfId);

			if (!pdf) {
				return res.status(404).json({ error: 'PDF not found' });
			}

			// Return the PDF data including the owner field
			res.json(pdf);
		} catch (error) {
			console.error('Error retrieving PDF data:', error);
			res.status(500).json({ error: 'Server error' });
		}
	},
};
