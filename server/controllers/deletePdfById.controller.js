const PDF = require('../models/PDF');
module.exports = {
	async delete(req, res) {
		try {
			const pdf = await PDF.deleteOne({ _id: req.params.id });
			if (pdf.deletedCount === 0) {
				return res.status(404).json({ message: 'PDF not found.' });
			}
			return res
				.status(200)
				.json({ message: 'PDF deleted successfully.' });
		} catch (error) {
			return res.status(500).json({
				message: 'Failed to delete PDF.',
				error: error.message,
			});
		}
	},
};
