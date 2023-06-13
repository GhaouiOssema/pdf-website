const path = require('path');

module.exports = {
	async pdfView(req, res) {
		const filename = req.params.path;

		const filePath = path.join(__dirname, 'uploads', filename);

		res.sendFile(filePath);
	},
};
